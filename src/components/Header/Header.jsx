import { NavLink } from 'react-router';
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
            <nav className="navigation">
                <Container>
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <NavLink to={'/'} className="navigation__link">
                                home
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink
                                to={'/price-and-conditions'}
                                className="navigation__link"
                            >
                                pricing & conditions
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink href="#" className="navigation__link">
                                portfolio
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink href="#" className="navigation__link">
                                contact
                            </NavLink>
                        </li>
                    </ul>
                </Container>
            </nav>
        </header>
    );
};

export default Header;
