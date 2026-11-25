import sharp from 'sharp';

export const PHOTO_CACHE_CONTROL = 'public, max-age=31536000, immutable';

export function getPhotoVariantKeys(key: string) {
    return {
        previewKey: `${key}.preview.webp`,
        displayKey: `${key}.display.webp`,
    };
}

// Auto-orient before resizing so phone/camera EXIF rotation is respected.
// Bounding both dimensions preserves proportions and limits the longest edge.
export async function createPhotoVariants(source: Buffer) {
    const create = (size: number, quality: number) => sharp(source)
        .rotate()
        .resize(size, size, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toBuffer({ resolveWithObject: true });

    const [preview, display] = await Promise.all([create(800, 82), create(2400, 85)]);

    return {
        preview: preview.data,
        display: display.data,
        // These dimensions share the orientation and aspect ratio of both versions.
        width: display.info.width,
        height: display.info.height,
    };
}
