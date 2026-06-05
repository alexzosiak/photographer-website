import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await pool.query(
      `
      DELETE FROM photos
      WHERE id = $1
      `,
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/photos/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}