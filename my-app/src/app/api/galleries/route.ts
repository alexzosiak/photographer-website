import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        g.id,
        g.title,
        g.slug,
        g.cover_key,
        g.created_at,
        COALESCE(
          json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
          '[]'
        ) AS tags
      FROM galleries g
      LEFT JOIN gallery_tags gt ON gt.gallery_id = g.id
      LEFT JOIN tags t ON t.id = gt.tag_id
      GROUP BY g.id
      ORDER BY g.created_at DESC;
    `);

    const galleries = result.rows.map((gallery) => ({
      ...gallery,
      coverUrl: gallery.cover_key
        ? `${process.env.R2_PUBLIC_URL}/${gallery.cover_key}`
        : null,
    }));

    return NextResponse.json({ galleries });
  } catch (error) {
    console.error("GET /api/galleries error:", error);

    return NextResponse.json(
      { error: "Failed to load galleries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, slug, tags } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const galleryResult = await pool.query(
      `
        INSERT INTO galleries (title, slug)
        VALUES ($1, $2)
        RETURNING *
      `,
      [title, slug]
    );

    const gallery = galleryResult.rows[0];

    if (Array.isArray(tags) && tags.length > 0) {
      await pool.query(
        `
          INSERT INTO gallery_tags (gallery_id, tag_id)
          SELECT $1, id
          FROM tags
          WHERE name = ANY($2::text[])
        `,
        [gallery.id, tags]
      );
    }

    return NextResponse.json({ gallery }, { status: 201 });
  } catch (error) {
    console.error("POST /api/galleries error:", error);

    return NextResponse.json(
      { error: "Failed to create gallery" },
      { status: 500 }
    );
  }
}