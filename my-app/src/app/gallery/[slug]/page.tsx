import Link from "next/link";
import GalleryLightbox from "../../gallery/GalleryLightbox";
import styles from "./page.module.scss";

type Gallery = {
  id: string;
  title: string;
  slug: string;
  cover_key: string | null;
};

type Photo = {
  id: string;
  key: string;
  sort_order: number;
};

async function getGallery(slug: string): Promise<{
  gallery: Gallery;
  photos: Photo[];
}> {
  const res = await fetch(`http://localhost:3000/api/galleries/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch gallery");
  }

  return res.json();
}

export default async function SingleGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { gallery, photos } = await getGallery(slug);

  return (
    <section className={styles.page}>
      <Link href="/gallery" className={styles.backLink}>
        ← Back to gallery
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{gallery.title}</h1>
        <p className={styles.count}>{photos.length} photos</p>
      </div>

      <div className={styles.grid}>
        <GalleryLightbox
  photos={photos}
  title={gallery.title}
  publicUrl={process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ""}
/>
      </div>
    </section>
  );
}
