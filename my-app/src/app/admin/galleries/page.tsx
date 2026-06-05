import Link from "next/link";
import styles from "./page.module.scss";

type Gallery = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
};

async function getGalleries(): Promise<Gallery[]> {
  const res = await fetch("http://localhost:3000/api/galleries", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.galleries;
}

export default async function AdminGalleriesPage() {
  const galleries = await getGalleries();

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link href="/admin" className={styles.backLink}>
            ← Back to dashboard
          </Link>
          <h1 className={styles.title}>Admin Galleries</h1>
        </div>

        <Link href="/admin/galleries/new" className={styles.button}>
          + Create gallery
        </Link>
      </div>

      <ul className={styles.list}>
        {galleries.map((gallery) => (
          <li key={gallery.id} className={styles.item}>
            <div>
              <strong className={styles.itemTitle}>{gallery.title}</strong>
              <p className={styles.slug}>{gallery.slug}</p>
              {gallery.tags.length > 0 && (
                <div className={styles.tags}>
                  {gallery.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`/admin/galleries/${gallery.id}`}
              className={styles.editLink}
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
