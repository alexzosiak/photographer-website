import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { createPhotoVariants, getPhotoVariantKeys } from '../src/lib/photo-variants.ts';

async function image(width, height, orientation) {
    let pipeline = sharp({ create: { width, height, channels: 3, background: '#738f9c' } }).jpeg();
    if (orientation) pipeline = pipeline.withMetadata({ orientation });
    return pipeline.toBuffer();
}

test('4000x6000 photo becomes proportional preview and display versions', async () => {
    const source = await image(4000, 6000);
    const original = Buffer.from(source);
    const variants = await createPhotoVariants(source);
    const preview = await sharp(variants.preview).metadata();
    const display = await sharp(variants.display).metadata();
    assert.deepEqual([preview.width, preview.height, preview.format], [533, 800, 'webp']);
    assert.deepEqual([display.width, display.height], [1600, 2400]);
    assert.deepEqual([variants.width, variants.height], [1600, 2400]);
    assert.deepEqual(source, original, 'original bytes must stay unchanged');
});

test('landscape photos preserve their proportions', async () => {
    const variants = await createPhotoVariants(await image(3000, 2000));
    const preview = await sharp(variants.preview).metadata();
    assert.deepEqual([preview.width, preview.height], [800, 533]);
    assert.deepEqual([variants.width, variants.height], [2400, 1600]);
});

test('EXIF rotation is applied before computing dimensions', async () => {
    const variants = await createPhotoVariants(await image(1200, 800, 6));
    const preview = await sharp(variants.preview).metadata();
    assert.deepEqual([preview.width, preview.height], [533, 800]);
    assert.deepEqual([variants.width, variants.height], [800, 1200]);
    assert.equal(preview.orientation, undefined);
});

test('small photos are never enlarged', async () => {
    const variants = await createPhotoVariants(await image(320, 200));
    const preview = await sharp(variants.preview).metadata();
    assert.deepEqual([preview.width, preview.height], [320, 200]);
    assert.deepEqual([variants.width, variants.height], [320, 200]);
});

test('invalid input fails instead of producing broken web versions', async () => {
    await assert.rejects(() => createPhotoVariants(Buffer.from('not an image')));
});

test('variant keys are distinct and remain inside the original gallery folder', () => {
    const key = 'galleries/story/uuid/original';
    assert.deepEqual(getPhotoVariantKeys(key), {
        previewKey: `${key}.preview.webp`,
        displayKey: `${key}.display.webp`,
    });
});
