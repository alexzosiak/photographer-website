import { NavLink } from 'react-router';
import Container from '../container/container';
import './AppNavigation.scss';

const AppNavigation = () => {
    return (
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
    );
};

export default AppNavigation;
