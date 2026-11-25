import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineMail } from "react-icons/hi";
import style from './app-footer.module.scss';

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/photographer_dublin/',
        Icon: FaInstagram,
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/353870027686',
        Icon: FaWhatsapp,
    },
    {
        label: 'Email',
        href: 'mailto:mokina.viktoria.photo@gmail.com',
        Icon: HiOutlineMail,
    },
];

const AppFooter = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <Link href="/" className={style.brand}>
                    <span className={style.name}>Viktoria Mokina</span>
                    <span className={style.caption}>Photographer</span>
                </Link>

                <nav aria-label="Footer navigation">
                    <ul className={style.links}>
                        <li><Link href="/portfolio">Portfolio</Link></li>
                        <li><Link href="/price">Pricing & Conditions</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>

                <nav aria-label="Social media and email">
                    <ul className={style.socials}>
                        {socialLinks.map(({ label, href, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target={href.startsWith('https:') ? '_blank' : undefined}
                                    rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                                    aria-label={href.startsWith('mailto:') ? `Email ${href.slice(7)}` : `${label} (opens in a new tab)`}
                                    className={style.socialLink}
                                >
                                    <Icon size={22} aria-hidden="true" focusable="false" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <p className={style.copyright}>
                <small>© {new Date().getFullYear()} Viktoria Mokina. All rights reserved.</small>
            </p>
        </footer>
    );
};

export default AppFooter;
