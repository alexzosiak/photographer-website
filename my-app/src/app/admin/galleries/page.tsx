import Link from "next/link";

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
    <main>
      <h1>Admin Galleries</h1>

      <Link href="/admin/galleries/new">+ Create gallery</Link>

      <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}>
            <strong>{gallery.title}</strong> — {gallery.slug}{" "}
            <Link href={`/admin/galleries/${gallery.id}`}>Edit</Link>
          </li>
        ))}
        
      </ul>
    </main>
  );
}