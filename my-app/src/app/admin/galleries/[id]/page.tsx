import Link from 'next/link';
import UploadPhotoForm from './UploadPhotoForm';
import DeletePhotoButton from './DeletePhotoButton';
import DeleteGalleryButton from "./DeleteGalleryButton";
import EditGalleryForm from "./EditGalleryForm";
import SortablePhotos from "./SortablePhotos";
import { notFound } from "next/navigation";
import { getGalleryById } from "@/lib/galleries";
import styles from './page.module.scss';

export default async function AdminGalleryEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const data = await getGalleryById(id);

    if (!data) {
        notFound();
    }

    const { gallery, photos } = data;

    return (
        <section className={styles.page}>
            <Link href="/admin/galleries" className={styles.backLink}>
                ← Back to galleries
            </Link>
            
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Edit Gallery</h1>
                    <h2 className={styles.galleryTitle}>{gallery.title}</h2>
                    <p className={styles.slug}>{gallery.slug}</p>
                </div>
            </div>
            
            <EditGalleryForm gallery={gallery} />
            <UploadPhotoForm galleryId={gallery.id} slug={gallery.slug} />
            <DeleteGalleryButton galleryId={gallery.id} />

            <div className={styles.photosHeader}>
                <h3>Photos</h3>
                <span>{photos.length} items</span>
            </div>
            
            <div className={styles.photoGrid}>
                
                {<SortablePhotos
  photos={photos}
  title={gallery.title}
  publicUrl={process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ""}
/>}

                {/* {photos.map((photo) => (
                     <div key={photo.id}>
                    <DeletePhotoButton photoId={photo.id} />
                    <img
                        className={styles.photo}
                        key={photo.id}
                        src={`${process.env.R2_PUBLIC_URL}/${photo.key}`}
                        alt={gallery.title}
                        width={200}
                        height={250}
                    />
                    </div>
                ))} */}
            </div>
        </section>
    );
}
