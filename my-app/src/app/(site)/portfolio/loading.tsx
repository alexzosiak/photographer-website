import Skeleton from '@/components/shared/skeleton/Skeleton';
import styles from './page.module.scss';

export default function Loading() {
    return (
        <section className={styles.gallery} aria-label="Loading albums" aria-busy="true">
            <header className={styles.header}>
                <h1 className={styles.title}>Portfolio</h1>
                <p className={styles.lead}>Stories of love, connection, and the moments in between.</p>
            </header>
            <ul className={styles.grid} aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                    <li key={index}>
                        <Skeleton className={styles.imageFrame} />
                        <div className={styles.cardCaption}>
                            <Skeleton style={{ width: '65%', height: '2rem', marginInline: 'auto' }} />
                            <Skeleton style={{ width: '30%', height: '0.75rem', margin: '14px auto 0' }} />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
