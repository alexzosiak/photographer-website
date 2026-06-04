import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { galleryId, key } = body;

    if (!galleryId || !key) {
      return NextResponse.json(
        { error: "galleryId and key are required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO photos (
        gallery_id,
        key
      )
      VALUES ($1, $2)
      RETURNING *
      `,
      [galleryId, key]
    );

    return NextResponse.json({
      photo: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create photo" },
      { status: 500 }
    );
  }
}