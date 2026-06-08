import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import { pool } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const photoResult = await pool.query(
      `
      SELECT key
      FROM photos
      WHERE id = $1
      `,
      [id]
    );

    if (photoResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      );
    }

    const photoKey = photoResult.rows[0].key;

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: photoKey,
      })
    );

    await pool.query(
      `
      DELETE FROM photos
      WHERE id = $1
      `,
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE photo error:", error);

    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}