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
    <main>
      <h1>Gallery</h1>

      <div>
        <button>All</button>
        <button>Family</button>
        <button>Wedding</button>
        <button>Couple</button>
        <button>Pregnancy</button>
      </div>

      <div>
        {galleries.map((gallery) => (
          <Link key={gallery.id} href={`/gallery/${gallery.slug}`}>
            <div>
              {gallery.coverUrl ? (
                <img
                  src={gallery.coverUrl}
                  alt={gallery.title}
                  width={300}
                  height={300}
                />
              ) : (
                <div>No cover</div>
              )}

              <h2>{gallery.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}