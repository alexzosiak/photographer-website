import Link from "next/link";
import styles from "./page.module.scss";
import { requireAdminAuth } from "@/lib/adminAuth";
import LogoutButton from "./Galleries/LogoutButton";

const Admin = async () => {
    await requireAdminAuth();

    return (
        <section className={styles.admin}>
                <LogoutButton />
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
            </ul>
        </section>
    );
};

export default Admin;
