import Link from "next/link";
import styles from "./page.module.scss";

const Admin = () => {
    return (
        <section className={styles.admin}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Admin panel</p>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.text}>Ти увійшов. Тут можна керувати галереями та фотографіями.</p>
            </div>

            <ul className={styles.actions}>
                <li>
                    <Link href="/admin/galleries" className={styles.action}>
                        <span>Manage Galleries</span>
                        <span className={styles.arrow}>→</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/photos" className={styles.action}>
                        <span>Manage Photos</span>
                        <span className={styles.arrow}>→</span>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default Admin;
