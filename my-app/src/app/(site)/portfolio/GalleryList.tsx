import Link from 'next/link';
import type { GalleryListItem } from '@/lib/galleries';
import LoadingImage from '@/components/shared/loading-image/LoadingImage';
import styles from './page.module.scss';

type Props = {
    galleries: Pick<GalleryListItem, 'id' | 'title' | 'slug' | 'coverUrl'>[];
};

export default function GalleryList({ galleries }: Props) {
    if (galleries.length === 0) {
        return <p className={styles.empty}>New photo stories are coming soon.</p>;
    }

    return (
        <ul className={styles.grid}>
            {galleries.map((gallery) => (
                <li key={gallery.id}>
                    <Link href={`/portfolio/${gallery.slug}`} className={styles.card}>
                        <div className={styles.imageFrame}>
                            {gallery.coverUrl ? (
                                <LoadingImage
                                    className={styles.cover}
                                    src={gallery.coverUrl}
                                    alt=""
                                    width={720}
                                    height={900}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className={styles.noCover}>Photo story</div>
                            )}
                        </div>
                        <div className={styles.cardCaption}>
                            <h2 className={styles.cardTitle}>{gallery.title}</h2>
                            <span className={styles.viewLabel}>View gallery</span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
