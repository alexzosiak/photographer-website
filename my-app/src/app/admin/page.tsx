import Link from "next/link";

const Admin = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>Admin Dashboard</h1>
            <p>Ти увійшов 🎉</p>

            buttons:
            <ul>
                <li><Link href="/admin/galleries">Manage Galleries</Link></li>
                <li><Link href="/admin/photos">Manage Photos</Link></li>
                
            </ul>
        </div>
    );
};

export default Admin;
