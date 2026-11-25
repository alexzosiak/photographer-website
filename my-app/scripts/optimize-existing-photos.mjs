import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { createPhotoVariants, getPhotoVariantKeys, PHOTO_CACHE_CONTROL } from '../src/lib/photo-variants.ts';

const require = createRequire(import.meta.url);
require('@next/env').loadEnvConfig(process.cwd());

// Default is read-only. --apply adds nullable columns and creates web versions.
// Originals remain intact; reruns skip photos that already have both versions.
const apply = process.argv.includes('--apply');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    query_timeout: 30000,
});
const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
    },
});
const Bucket = process.env.R2_BUCKET_NAME;

try {
    if (apply) {
        await pool.query(await readFile(new URL('../src/database/migration/002_photo_variants.sql', import.meta.url), 'utf8'));
    }
    // to_jsonb also works before the new columns exist in dry-run mode.
    const { rows } = await pool.query(`
        SELECT id, key FROM photos p
        WHERE to_jsonb(p)->>'preview_key' IS NULL
           OR to_jsonb(p)->>'display_key' IS NULL
           OR to_jsonb(p)->>'width' IS NULL
           OR to_jsonb(p)->>'height' IS NULL
        ORDER BY id
    `);
    console.log(`${rows.length} photos need web versions. Mode: ${apply ? 'apply' : 'dry run'}.`);
    let originalBytes = 0;
    let previewBytes = 0;
    let displayBytes = 0;
    let completed = 0;
    if (apply) {
        // Process sequentially to bound memory and avoid saturating storage/network.
        for (const photo of rows) {
            try {
                const object = await r2.send(new GetObjectCommand({ Bucket, Key: photo.key }));
                if (!object.Body) throw new Error('Original image has no body');
                const source = Buffer.from(await object.Body.transformToByteArray());
                const variants = await createPhotoVariants(source);
                const { previewKey, displayKey } = getPhotoVariantKeys(photo.key);
                await Promise.all([
                    [previewKey, variants.preview],
                    [displayKey, variants.display],
                ].map(([Key, Body]) => r2.send(new PutObjectCommand({
                    Bucket, Key, Body, ContentType: 'image/webp', CacheControl: PHOTO_CACHE_CONTROL,
                }))));
                // Publish the new URLs together only after both objects exist.
                const updated = await pool.query(`
                    UPDATE photos SET preview_key = $1, display_key = $2, width = $3, height = $4
                    WHERE id = $5 AND key = $6
                `, [previewKey, displayKey, variants.width, variants.height, photo.id, photo.key]);
                if (updated.rowCount !== 1) throw new Error('Photo changed during processing; rerun to reconcile');
                originalBytes += source.length;
                previewBytes += variants.preview.length;
                displayBytes += variants.display.length;
                completed += 1;
                console.log(JSON.stringify({ completed, total: rows.length, originalBytes: source.length, previewBytes: variants.preview.length, displayBytes: variants.display.length }));
            } catch (error) {
                console.error(`Photo ${photo.id} failed: ${error.name}`);
                process.exitCode = 1;
            }
        }
        console.log(JSON.stringify({ completed, originalBytes, previewBytes, displayBytes }));
    }
} catch (error) {
    console.error(`Photo optimization failed: ${error.code || error.name}`);
    process.exitCode = 1;
} finally {
    await pool.end();
    r2.destroy();
}
