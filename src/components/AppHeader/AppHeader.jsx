
import { useEffect, useState } from 'react';
import Container from '../container/container';
import './header.scss';

const Header = () => {
    const [isTransparent, setIsTransparent] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 50) {
    //             setIsTransparent(true);
    //         } else {
    //             setIsTransparent(false);
    //         }
    //     };
    //     window.addEventListener('scroll', handleScroll);

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    return (
        <header className={`header ${isTransparent ? 'transparent' : ''}`}>
                <AppNavigation />
        </header>
    );
};

export default Header;
