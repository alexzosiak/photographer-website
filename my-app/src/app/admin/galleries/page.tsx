import Link from 'next/link';
import LogoutButton from "./LogoutButton";
import styles from './page.module.scss';

type Gallery = {
    id: string;
    title: string;
    slug: string;
    tags: string[];
    coverUrl: string | null;
};

async function getGalleries(): Promise<Gallery[]> {
    const res = await fetch('http://localhost:3000/api/galleries', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch galleries');
    }

    const data = await res.json();

    return data.galleries;
}

export default async function AdminGalleriesPage() {
    const galleries = await getGalleries();

    return (
        <section className={styles.page}>
             <LogoutButton />
            <div className={styles.header}>
                <div>
                    <Link href="/admin" className={styles.backLink}>
                        ← Back to dashboard
                    </Link>
                    <h1 className={styles.title}>Admin Galleries</h1>
                    <p className={styles.subtitle}>
                        Manage covers, tags and photo stories shown on the
                        public gallery.
                    </p>
                </div>

                <Link href="/admin/galleries/new" className={styles.button}>
                    + Create gallery
                </Link>
            </div>

            <ul className={styles.list}>
                {galleries.map((gallery) => (
                    <li key={gallery.id} className={styles.item}>
                        <div className={styles.preview}>
                            {gallery.coverUrl ? (
                                <img
                                    className={styles.cover}
                                    src={gallery.coverUrl}
                                    alt={gallery.title}
                                    width={420}
                                    height={520}
                                />
                            ) : (
                                <div className={styles.noCover}>No cover</div>
                            )}
                        </div>

                        <div className={styles.itemContent}>
                            <div>
                                <span className={styles.label}>Album</span>
                                <strong className={styles.itemTitle}>
                                    {gallery.title}
                                </strong>
                                <p className={styles.slug}>/{gallery.slug}</p>
                            </div>

                            {gallery.tags.length > 0 ? (
                                <div className={styles.tags}>
                                    {gallery.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.noTags}>No tags added</p>
                            )}

                            <Link
                                href={`/admin/galleries/${gallery.id}`}
                                className={styles.editLink}
                            >
                                Edit
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
           
        </section>
    );
}
