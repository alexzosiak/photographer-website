import styles from "./page.module.scss";
import GalleryClient from "./GalleryClient";

type Gallery = {
  id: string;
  title: string;
  slug: string;
  cover_key: string | null;
  coverUrl: string | null;
  tags: string[];
};

async function getGalleries(): Promise<Gallery[]> {
  const res = await fetch("http://localhost:3000/api/galleries", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch galleries");
  }

  const data = await res.json();

  return data.galleries;
}

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <section className={styles.gallery}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Selected photo stories</p>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.lead}>
          Warm, cinematic collections for families, couples, weddings and quiet
          in-between moments.
        </p>
      </div>

      <GalleryClient galleries={galleries} />
    </section>
  );
}
