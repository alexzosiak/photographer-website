import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

async function listR2KeysByPrefix(prefix: string) {
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME!,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );

    for (const object of result.Contents || []) {
      if (object.Key) {
        keys.push(object.Key);
      }
    }

    continuationToken = result.NextContinuationToken;
  } while (continuationToken);

  return keys;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const galleryResult = await pool.query(
      `
      SELECT
        g.*,
        COALESCE(
          json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
          '[]'
        ) AS tags
      FROM galleries g
      LEFT JOIN gallery_tags gt ON gt.gallery_id = g.id
      LEFT JOIN tags t ON t.id = gt.tag_id
      WHERE g.id = $1
      GROUP BY g.id
      `,
      [id]
    );

    if (galleryResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    const photosResult = await pool.query(
      `
      SELECT *
      FROM photos
      WHERE gallery_id = $1
      ORDER BY sort_order ASC
      `,
      [id]
    );

    return NextResponse.json({
      gallery: galleryResult.rows[0],
      photos: photosResult.rows,
    });
  } catch (error) {
    console.error("GET admin gallery error:", error);

    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { title, slug, coverKey, tags } = body;
    const nextCoverKey = coverKey || null;

    await pool.query("BEGIN");

    const currentGalleryResult = await pool.query(
      `
      SELECT cover_key, slug
      FROM galleries
      WHERE id = $1
      `,
      [id]
    );

    if (currentGalleryResult.rows.length === 0) {
      await pool.query("ROLLBACK");

      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    const previousCoverKey = currentGalleryResult.rows[0].cover_key;

    const galleryResult = await pool.query(
      `
      UPDATE galleries
      SET 
        title = $1,
        slug = $2,
        cover_key = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
      `,
      [title, slug, nextCoverKey, id]
    );

    await pool.query(
      `
      DELETE FROM gallery_tags
      WHERE gallery_id = $1
      `,
      [id]
    );

    if (Array.isArray(tags) && tags.length > 0) {
      await pool.query(
        `
        INSERT INTO gallery_tags (gallery_id, tag_id)
        SELECT $1, id
        FROM tags
        WHERE name = ANY($2::text[])
        `,
        [id, tags]
      );
    }

    await pool.query("COMMIT");

    if (previousCoverKey && previousCoverKey !== nextCoverKey) {
      try {
        await r2.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: previousCoverKey,
          })
        );
      } catch (deleteError) {
        console.error("Failed to delete previous gallery cover:", deleteError);
      }
    }

    return NextResponse.json({
      gallery: galleryResult.rows[0],
    });
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("PATCH admin gallery error:", error);

    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const galleryResult = await pool.query(
      `
      SELECT cover_key, slug
      FROM galleries
      WHERE id = $1
      `,
      [id]
    );

    if (galleryResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    const photosResult = await pool.query(
      `
      SELECT key
      FROM photos
      WHERE gallery_id = $1
      `,
      [id]
    );

    const gallery = galleryResult.rows[0];
    const coverFolderKeys = await listR2KeysByPrefix(`covers/${gallery.slug}/`);
    const galleryFolderKeys = await listR2KeysByPrefix(
      `galleries/${gallery.slug}/`
    );

    const keysToDelete = Array.from(
      new Set(
        [
          ...coverFolderKeys,
          ...galleryFolderKeys,
          gallery.cover_key,
          ...photosResult.rows.map((photo) => photo.key),
        ].filter(Boolean)
      )
    );

    for (const key of keysToDelete) {
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: key,
        })
      );
    }

    await pool.query(
      `
      DELETE FROM galleries
      WHERE id = $1
      `,
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE gallery error:", error);

    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
}
