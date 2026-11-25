import styles from './page.module.scss';
import GalleryList from './GalleryList';
import { getGalleries } from '@/lib/galleries';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const galleries = await getGalleries();

    return (
        <section className={styles.gallery} aria-labelledby="portfolio-title">
            <header className={styles.header}>
                <h1 id="portfolio-title" className={styles.title}>Portfolio</h1>
                <p className={styles.lead}>Stories of love, connection, and the moments in between.</p>
            </header>
            <GalleryList galleries={galleries} />
        </section>
    );
}
