// import PortfolioHero from '@/components/PortfolioHero/PortfolioHero';
// import PortfolioFilter from '@/components/PortfolioFilter/PortfolioFilter';
// import PortfolioWorks from '@/components/PortfolioWorks/PortfolioWorks';

// const Portfolio = (): JSX.Element => {
//     return (
//         <>
//             <PortfolioHero/>
//             <PortfolioFilter/>
//             <PortfolioWorks/>
//         </>
//     )
// }

// export default Portfolio;



import Link from "next/link";
import styles from "./page.module.scss";

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
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery</h1>
      </div>

      <div className={styles.filters} aria-label="Gallery filters">
        <button className={styles.filter}>All</button>
        <button className={styles.filter}>Family</button>
        <button className={styles.filter}>Wedding</button>
        <button className={styles.filter}>Couple</button>
        <button className={styles.filter}>Pregnancy</button>
      </div>

      <div className={styles.grid}>
        {galleries.map((gallery) => (
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
                width={300}
                height={300}
              />
            ) : (
              <div className={styles.noCover}>No cover</div>
            )}

            <div className={styles.cardBody}>
              <h2>{gallery.title}</h2>
              {gallery.tags.length > 0 && (
                <p>{gallery.tags.join(" / ")}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
