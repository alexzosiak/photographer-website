import Container from '../container/container';
import './footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <ul className='navigation__list'>
                    <li className='navigation__item'>
                        <a href="#" className='navigation__link'>home</a>
                    </li>
                    <li className='navigation__item'>
                        <a href="#" className='navigation__link'>pricing & conditions</a>
                    </li>
                    <li className='navigation__item'>
                        <a href="#" className='navigation__link'>portfolio</a>
                    </li>
                    <li className='navigation__item'>
                        <a href="#" className='navigation__link'>contact</a>
                    </li>
                </ul>
            </Container>
        </footer>
    )
}

export default Footer;