'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import './app-navigation.scss';

const links = [
    { key: 'home', href: '/', label: 'Home' },
    { key: 'portfolio', href: '/gallery', label: 'Portfolio' },
    { key: 'pricing', href: '/price', label: 'Pricing & Conditions' },
    { key: 'contact', href: '/contact', label: 'Contact' },
];

const AppNavigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!menuOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        const handleBreakpointChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setMenuOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleBreakpointChange);

        return () => {
            mediaQuery.removeEventListener('change', handleBreakpointChange);
        };
    }, []);

    const createLinks = (
        href: string,
        label: string,
        key: string,
        pathname: string,
    ) => {
        return (
            <li key={key} className="navigation__item">
                <Link
                    href={href}
                    className={`navigation__link ${pathname === href ? 'active' : ''}`}
                    aria-current={pathname === href ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                >
                    {label}
                </Link>
            </li>
        );
    };

    return (
        <nav className="navigation" aria-label="Main navigation">
            <ul
                id="mobile-navigation"
                className={`navigation__list ${menuOpen ? 'navigation__list--open' : ''}`}
            >
                {links
                    .slice(0, 2)
                    .map((link) =>
                        createLinks(link.href, link.label, link.key, pathname),
                    )}
                <li className="brand">
                    <Link href={'/'} key={'logo'} className="brand__link">
                        <span className="brand__name">Viktoria Mokina</span>
                        <span className="brand__caption">photographer</span>
                    </Link>
                </li>
                {links
                    .slice(2)
                    .map((link) =>
                        createLinks(link.href, link.label, link.key, pathname),
                    )}
            </ul>

            <button
                type="button"
                className="navigation__toggle"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>
    );
};

export default AppNavigation;
