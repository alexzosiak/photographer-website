import { NavLink } from 'react-router';
import Container from '../container/container';
import './navigation.scss';

const Navigation = () => {
    return (
        <header>
            <nav className='navigation'>
                <Container>
                <ul className='navigation__list'>
                    <li className='navigation__item'>
                        <NavLink to={'/'} className='navigation__link'>home</NavLink>
                    </li>
                    <li className='navigation__item'>
                        <NavLink to={'/price-and-conditions'} className='navigation__link'>pricing & conditions</NavLink>
                    </li>
                    <li className='navigation__item'>
                        <NavLink href="#" className='navigation__link'>portfolio</NavLink>
                    </li>
                    <li className='navigation__item'>
                        <NavLink href="#" className='navigation__link'>contact</NavLink>
                    </li>
                </ul>
                </Container>
            </nav>
        </header>
    )
};

export default Navigation;
