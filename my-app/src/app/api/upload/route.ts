import { NextResponse } from 'next/server';
import { DeleteObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';
import sharp from 'sharp';
import crypto from 'crypto';
import { createPhotoVariants, getPhotoVariantKeys, PHOTO_CACHE_CONTROL } from '@/lib/photo-variants';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get('file') as File | null;
        const slug = formData.get('slug') as string | null;
        const type = formData.get('type') as 'cover' | 'photo' | null;

        if (!(file instanceof File) || !slug || (type !== 'cover' && type !== 'photo')) {
            return NextResponse.json(
                { error: 'File, slug and type are required' },
                { status: 400 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileId = crypto.randomUUID();
        const put = (key: string, body: Buffer, contentType: string) => r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: body,
                ContentType: contentType,
                CacheControl: PHOTO_CACHE_CONTROL,
            }),
        );

        if (type === 'cover') {
            const cover = await sharp(buffer)
                .rotate()
                .resize(1200, 1200, { fit: 'cover', withoutEnlargement: true })
                .webp({ quality: 82 })
                .toBuffer();
            const key = `covers/${slug}/${fileId}.webp`;
            await put(key, cover, 'image/webp');
            return NextResponse.json({ success: true, key });
        }

        const variants = await createPhotoVariants(buffer);
        // Retain the exact uploaded file separately from the public web versions.
        const key = `galleries/${slug}/${fileId}/original`;
        const { previewKey, displayKey } = getPhotoVariantKeys(key);
        const uploads = await Promise.allSettled([
            put(key, buffer, file.type || 'application/octet-stream'),
            put(previewKey, variants.preview, 'image/webp'),
            put(displayKey, variants.display, 'image/webp'),
        ]);
        if (uploads.some((upload) => upload.status === 'rejected')) {
            // All requests have settled, so cleanup cannot race a late upload.
            try {
                await r2.send(new DeleteObjectsCommand({
                    Bucket: process.env.R2_BUCKET_NAME!,
                    Delete: { Objects: [key, previewKey, displayKey].map((Key) => ({ Key })) },
                }));
            } catch (cleanupError) {
                console.error('Failed to clean up incomplete photo upload:', cleanupError);
            }
            throw new Error('Failed to upload all photo versions');
        }

        // The photo is saved to the database only after all three uploads succeed.
        return NextResponse.json({
            success: true,
            key,
            previewKey,
            displayKey,
            width: variants.width,
            height: variants.height,
        });
    } catch (error) {
        console.error('POST /api/upload error:', error);

        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 },
        );
    }
}
