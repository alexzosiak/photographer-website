import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

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