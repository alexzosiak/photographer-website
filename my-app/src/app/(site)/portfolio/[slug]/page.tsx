import Link from 'next/link';
import { notFound } from 'next/navigation';
import GalleryLightbox from '../GalleryLightbox';
import { getGalleryBySlug } from '@/lib/galleries';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

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
        <section className={styles.page} aria-labelledby="gallery-title">
            <Link href="/portfolio" className={styles.backLink}>
                Back to all galleries
            </Link>

            <div className={styles.header}>
                <h1 id="gallery-title" className={styles.title}>
                    {gallery.title}
                </h1>
                <p className={styles.count}>
                    {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                </p>
            </div>

            {photos.length > 0 ? (
                <GalleryLightbox
                    photos={photos}
                    title={gallery.title}
                    publicUrl={
                        process.env.R2_PUBLIC_URL ||
                        process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
                        ''
                    }
                />
            ) : (
                <p className={styles.empty}>
                    Photos from this story are coming soon.
                </p>
            )}
        </section>
    );
}
