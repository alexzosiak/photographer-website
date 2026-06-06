"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.scss";

const filters = ["All", "Family", "Wedding", "Couple", "Pregnancy"];

type Gallery = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string | null;
  tags: string[];
};

type Props = {
  galleries: Gallery[];
};

export default function GalleryClient({ galleries }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGalleries =
    activeFilter === "All"
      ? galleries
      : galleries.filter((gallery) => gallery.tags.includes(activeFilter));

  return (
    <>
      <div className={styles.toolbar} aria-label="Gallery filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filter} ${
              activeFilter === filter ? styles.filterActive : ""
            }`}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredGalleries.length > 0 ? (
        <div className={styles.grid}>
          {filteredGalleries.map((gallery) => (
            <Link
              key={gallery.id}
              href={`/gallery/${gallery.slug}`}
              className={styles.card}
            >
              {gallery.coverUrl ? (
                <img
                  className={styles.cover}
                  src={gallery.coverUrl}
                  alt={gallery.title}
                  width={720}
                  height={900}
                />
              ) : (
                <div className={styles.noCover}>No cover</div>
              )}

              <span className={styles.cardMeta}>
                {gallery.tags.length > 0
                  ? gallery.tags.join(" / ")
                  : "Photo story"}
              </span>
              <h2 className={styles.cardTitle}>{gallery.title}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No galleries in this category yet.</p>
        </div>
      )}
    </>
  );
}
