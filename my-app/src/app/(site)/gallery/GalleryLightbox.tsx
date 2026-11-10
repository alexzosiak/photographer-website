"use client";
import styles from "./GalleryLightbox.module.scss";

import { useEffect, useState } from "react";

type Photo = {
  id: string;
  key: string;
};

type Props = {
  photos: Photo[];
  title: string;
  publicUrl: string;
};

export default function GalleryLightbox({ photos, title, publicUrl }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  function close() {
    setActiveIndex(null);
  }

  function next() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % photos.length);
  }

  function prev() {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === 0 ? photos.length - 1 : activeIndex - 1);
  }

  return (
    <>
      <div className={styles.galleryGrid}>
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={styles.galleryPhotoButton}
            onClick={() => setActiveIndex(index)}
          >
            <img src={`${publicUrl}/${photo.key}`} alt={title} loading="lazy" />
          </button>
        ))}
      </div>

      {activePhoto && (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Close photo"
          >
            ×
          </button>

          <button
            type="button"
            className={styles.lightboxPrev}
            onClick={prev}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            className={styles.lightboxImage}
            src={`${publicUrl}/${activePhoto.key}`}
            alt={title}
          />

          <button
            type="button"
            className={styles.lightboxNext}
            onClick={next}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
