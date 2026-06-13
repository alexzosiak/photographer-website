import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';
import sharp from 'sharp';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get('file') as File | null;
        const slug = formData.get('slug') as string | null;
        const type = formData.get('type') as 'cover' | 'photo' | null;

        if (!file || !slug || !type) {
            return NextResponse.json(
                { error: 'File, slug and type are required' },
                { status: 400 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const optimizedBuffer =
            type === 'cover'
                ? await sharp(buffer)
                      .resize(1200, 1200, {
                          fit: 'cover',
                          withoutEnlargement: true,
                      })
                      .webp({ quality: 95 })
                      .toBuffer()
                : await sharp(buffer)
                      .resize({
                          width: 4000,
                          withoutEnlargement: true,
                      })
                      .webp({ quality: 95 })
                      .toBuffer();

        const fileName = `${crypto.randomUUID()}.webp`;

        const key =
            type === 'cover'
                ? `covers/${slug}/${fileName}`
                : `galleries/${slug}/${fileName}`;

        await r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: optimizedBuffer,
                ContentType: 'image/webp',
            }),
        );

        return NextResponse.json({
            success: true,
            key,
            url: `${process.env.R2_PUBLIC_URL}/${key}`,
        });
    } catch (error) {
        console.error('POST /api/upload error:', error);

        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 },
        );
    }
}
