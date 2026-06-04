import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const galleryResult = await pool.query(
      `
      SELECT *
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