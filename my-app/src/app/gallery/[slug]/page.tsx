import Link from "next/link";

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
    <main>
      <Link href="/gallery">← Back</Link>

      <h1>{gallery.title}</h1>

      <div>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={`${process.env.R2_PUBLIC_URL}/${photo.key}`}
            alt={gallery.title}
            width={400}
            height={500}
          />
        ))}
      </div>
    </main>
  );
}