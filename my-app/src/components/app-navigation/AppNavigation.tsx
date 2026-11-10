'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from './app-navigation.module.scss';

const links = [
  { href: "/", label: "home" },
  { href: "/price", label: "pricing & conditions" },
  { href: "/gallery", label: "portfolio" },
  { href: "/contact", label: "contact" },
];

const AppNavigation = () => {
    const pathname = usePathname();

    return (
        <nav className={style.navigation}>
                <ul className={style.navigation__list}>
                    <li className={style.navigation__item}>
                        <Link href='/' className={style.navigation__link}>
                            home
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link
                            href='/price'
                            className={style.navigation__link}
                        >
                            pricing & conditions
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link href="/gallery" className={style.navigation__link}>
                            portfolio
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link href="/contact" className={style.navigation__link}>
                            contact
                        </Link>
                    </li>
                </ul>
         
        </nav>
    );
};

export default AppNavigation;
