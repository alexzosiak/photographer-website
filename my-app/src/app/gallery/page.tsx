import styles from "./page.module.scss";
import GalleryClient from "./GalleryClient";
import { getGalleries } from "@/lib/galleries";

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
