import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getGalleries } from "@/lib/galleries";

export async function GET() {
  try {
    const galleries = await getGalleries();

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

    const { title, slug, coverKey, tags } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const galleryResult = await pool.query(
      `
        INSERT INTO galleries (title, slug, cover_key)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, slug, coverKey || null]
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
