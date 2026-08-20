'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await fetch('/api/admin/logout', {
            method: 'POST',
        });

        router.push('/admin/login');
        router.refresh();
    }

    return (
        <button
            className={styles.logoutButton}
            type="button"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
