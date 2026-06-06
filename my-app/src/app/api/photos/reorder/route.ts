import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { photos } = body;

    if (!Array.isArray(photos)) {
      return NextResponse.json(
        { error: "Photos must be an array" },
        { status: 400 }
      );
    }

    await pool.query("BEGIN");

    for (const photo of photos) {
      await pool.query(
        `
        UPDATE photos
        SET sort_order = $1
        WHERE id = $2
        `,
        [photo.sortOrder, photo.id]
      );
    }

    await pool.query("COMMIT");

    return NextResponse.json({ success: true });
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("PATCH /api/photos/reorder error:", error);

    return NextResponse.json(
      { error: "Failed to reorder photos" },
      { status: 500 }
    );
  }
}