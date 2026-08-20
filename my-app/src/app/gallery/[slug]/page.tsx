import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryLightbox from "../../gallery/GalleryLightbox";
import { getGalleryBySlug } from "@/lib/galleries";
import styles from "./page.module.scss";

export default async function SingleGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getGalleryBySlug(slug);

  if (!data) {
    notFound();
  }

  const { gallery, photos } = data;

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
