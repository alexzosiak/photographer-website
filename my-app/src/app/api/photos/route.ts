import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getPhotoVariantKeys } from "@/lib/photo-variants";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { galleryId, key, previewKey, displayKey, width, height } = body;

    if (!galleryId || !key) {
      return NextResponse.json(
        { error: "galleryId and key are required" },
        { status: 400 }
      );
    }

    if (typeof key !== 'string') {
      return NextResponse.json({ error: 'Invalid photo key' }, { status: 400 });
    }
    const hasVariants = previewKey != null || displayKey != null || width != null || height != null;
    if (hasVariants) {
      const expected = getPhotoVariantKeys(key);
      if (previewKey !== expected.previewKey || displayKey !== expected.displayKey ||
          !Number.isInteger(width) || !Number.isInteger(height) ||
          width <= 0 || height <= 0 || width > 2400 || height > 2400) {
        return NextResponse.json({ error: 'Invalid photo versions or dimensions' }, { status: 400 });
      }
    }

    const result = await pool.query(
      `
      INSERT INTO photos (
        gallery_id,
        key, preview_key, display_key, width, height
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [galleryId, key, previewKey || null, displayKey || null, width || null, height || null]
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
