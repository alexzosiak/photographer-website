import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function GET() {
  try {
    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME!,
        MaxKeys: 5,
      })
    );

    return NextResponse.json({
      success: true,
      files: result.Contents ?? [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}