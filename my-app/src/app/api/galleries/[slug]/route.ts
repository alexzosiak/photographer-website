import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const galleryResult = await pool.query(
    `
      SELECT *
      FROM galleries
      WHERE slug = $1
    `,
    [slug]
  );

  if (galleryResult.rows.length === 0) {
    return NextResponse.json(
      { error: "Gallery not found" },
      { status: 404 }
    );
  }

  const gallery = galleryResult.rows[0];

  const photosResult = await pool.query(
    `
      SELECT *
      FROM photos
      WHERE gallery_id = $1
      ORDER BY sort_order ASC
    `,
    [gallery.id]
  );

  return NextResponse.json({
    gallery,
    photos: photosResult.rows,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const galleryResult = await pool.query(
      `
      SELECT id, cover_key
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

    const gallery = galleryResult.rows[0];

    const photosResult = await pool.query(
      `
      SELECT key
      FROM photos
      WHERE gallery_id = $1
      `,
      [id]
    );

    const keysToDelete = [
      gallery.cover_key,
      ...photosResult.rows.map((photo) => photo.key),
    ].filter(Boolean);

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