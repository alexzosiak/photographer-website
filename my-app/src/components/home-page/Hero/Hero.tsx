import Link from 'next/link';
import './hero.scss';
const Hero = () => {
    return (
        <section className="hero">
            <h1 className="hero__title">Wedding photography in Ireland</h1>
            <h2 className="hero__subtitle">Timeless Feelings in Every Frame</h2>
            <h3 className="hero__description">
                Dublin, Ennyscorthy, Wexford and averywere
            </h3>

            <div className='hero__button-container'>
                <Link href="/portfolio" className="hero__button-portfolio">
                    View Portfolio
                </Link>
                <Link href="/contact" className="hero__button-contact">
                    Inquired date
                </Link>
            </div>
        </section>
    );
};

export default Hero;
