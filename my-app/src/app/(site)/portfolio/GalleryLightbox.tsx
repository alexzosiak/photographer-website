"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPhoto } from '@/lib/galleries';
import LoadingImage from '@/components/shared/loading-image/LoadingImage';
import styles from './GalleryLightbox.module.scss';
import { getJustifiedLayout } from './justified-layout';

type Props = {
    photos: Pick<GalleryPhoto, 'id' | 'key' | 'preview_key' | 'display_key' | 'width' | 'height'>[];
    title: string;
    publicUrl: string;
};

export default function GalleryLightbox({ photos, title, publicUrl }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({});
    const gridRef = useRef<HTMLUListElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const isOpen = activeIndex !== null;
    const activePhoto = activeIndex !== null ? photos[activeIndex] : null;
    const imageUrl = (key: string) => `${publicUrl.replace(/\/$/, '')}/${key}`;

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width);
        });
        observer.observe(grid);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Cached images can finish loading before React attaches the load handler.
        const loadedSizes: Record<string, { width: number; height: number }> = {};
        gridRef.current?.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
            const key = image.dataset.photoKey;
            if (key && !photos.some((photo) => photo.key === key && photo.width && photo.height) && image.complete && image.naturalWidth && image.naturalHeight) {
                loadedSizes[key] = { width: image.naturalWidth, height: image.naturalHeight };
            }
        });
        if (Object.keys(loadedSizes).length > 0) {
            setImageSizes((sizes) => ({ ...sizes, ...loadedSizes }));
        }
    }, [photos]);

    const layout = useMemo(() => getJustifiedLayout(
        photos.map((photo) => {
            const size = photo.width && photo.height ? { width: photo.width, height: photo.height } : imageSizes[photo.key];
            return size ? size.width / size.height : 1.5;
        }),
        containerWidth,
        {
            gap: containerWidth <= 540 ? 8 : 16,
            targetHeight: containerWidth <= 540 ? 200 : containerWidth <= 900 ? 240 : 300,
            maxRowItems: containerWidth <= 540 ? 2 : 6,
        },
    ), [photos, imageSizes, containerWidth]);

    useEffect(() => {
        if (!isOpen) return;
        const dialog = dialogRef.current;
        if (!dialog) return;

        dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const close = () => setActiveIndex(null);
    const move = (direction: number) => {
        setActiveIndex((index) => index === null ? null : (index + direction + photos.length) % photos.length);
    };

    return (
        <>
            <ul
                ref={gridRef}
                className={styles.galleryGrid}
                data-ready={containerWidth > 0}
                style={containerWidth > 0 ? { height: layout.height } : undefined}
            >
                {photos.map((photo, index) => (
                    <li
                        key={photo.id}
                        className={styles.galleryItem}
                        style={layout.positions[index]}
                    >
                        <button
                            type="button"
                            className={styles.galleryPhotoButton}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Open photo ${index + 1} of ${photos.length}: ${title}`}
                            aria-haspopup="dialog"
                        >
                            <LoadingImage
                                src={imageUrl(photo.preview_key || photo.key)}
                                data-photo-key={photo.key}
                                alt={`${title} — photo ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                                width={photo.width || imageSizes[photo.key]?.width}
                                height={photo.height || imageSizes[photo.key]?.height}
                                onLoad={(event) => {
                                    if (photo.width && photo.height) return;
                                    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
                                    if (!width || !height) return;
                                    setImageSizes((sizes) => {
                                        const previous = sizes[photo.key];
                                        return previous?.width === width && previous.height === height
                                            ? sizes
                                            : { ...sizes, [photo.key]: { width, height } };
                                    });
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <dialog
                ref={dialogRef}
                className={styles.lightbox}
                aria-label={`${title} — photo viewer`}
                onCancel={(event) => {
                    event.preventDefault();
                    close();
                }}
                onClick={(event) => {
                    if (event.target === event.currentTarget ||
                        (event.target instanceof HTMLElement && event.target.classList.contains(styles.lightboxFrame))) close();
                }}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                        event.preventDefault();
                        move(event.key === 'ArrowRight' ? 1 : -1);
                    }
                }}
            >
                {activePhoto && (
                    <>
                        <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close photo" autoFocus>
                            <X size={26} aria-hidden="true" />
                        </button>
                        {photos.length > 1 && (
                            <button type="button" className={styles.lightboxPrev} onClick={() => move(-1)} aria-label="Previous photo">
                                <ChevronLeft size={32} aria-hidden="true" />
                            </button>
                        )}
                        <LoadingImage wrapperClassName={styles.lightboxFrame} className={styles.lightboxImage} src={imageUrl(activePhoto.display_key || activePhoto.key)} alt={`${title} — photo ${activeIndex! + 1}`} />
                        {photos.length > 1 && (
                            <button type="button" className={styles.lightboxNext} onClick={() => move(1)} aria-label="Next photo">
                                <ChevronRight size={32} aria-hidden="true" />
                            </button>
                        )}
                        <p className={styles.counter} aria-live="polite" aria-atomic="true">
                            {activeIndex! + 1} / {photos.length}
                        </p>
                    </>
                )}
            </dialog>
        </>
    );
}
