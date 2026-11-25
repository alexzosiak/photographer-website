import Link from 'next/link';
import Skeleton from '@/components/shared/skeleton/Skeleton';
import styles from './page.module.scss';
import galleryStyles from '../GalleryLightbox.module.scss';

export default function Loading() {
    return (
        <section className={styles.page} aria-label="Loading photos" aria-busy="true">
            <Link href="/portfolio" className={styles.backLink}>Back to all galleries</Link>
            <div className={styles.header}>
                <Skeleton style={{ width: '60%', maxWidth: 480, height: '3rem', marginInline: 'auto' }} />
                <Skeleton style={{ width: 80, height: '1rem', margin: '16px auto 0' }} />
            </div>
            <ul className={galleryStyles.galleryGrid} aria-hidden="true">
                {Array.from({ length: 9 }, (_, index) => (
                    <li key={index}>
                        <Skeleton style={{ aspectRatio: '3 / 2' }} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
