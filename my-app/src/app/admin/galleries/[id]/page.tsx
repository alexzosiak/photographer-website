import Link from "next/link";
import UploadPhotoForm from "./UploadPhotoForm";

type Gallery = {
  id: string;
  title: string;
  slug: string;
};

type Photo = {
  id: string;
  key: string;
  sort_order: number;
};

async function getGallery(id: string): Promise<{
  gallery: Gallery;
  photos: Photo[];
}> {
  const res = await fetch(`http://localhost:3000/api/admin/galleries/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load gallery");
  }

  return res.json();
}

export default async function AdminGalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { gallery, photos } = await getGallery(id);

  return (
    <main>
      <Link href="/admin/galleries">← Back</Link>

      <h1>Edit Gallery</h1>

      <h2>{gallery.title}</h2>
      <p>{gallery.slug}</p>

      <UploadPhotoForm galleryId={gallery.id} slug={gallery.slug} />

      <h3>Photos</h3>

      <div>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={`${process.env.R2_PUBLIC_URL}/${photo.key}`}
            alt={gallery.title}
            width={200}
            height={250}
          />
        ))}
      </div>
    </main>
  );
}