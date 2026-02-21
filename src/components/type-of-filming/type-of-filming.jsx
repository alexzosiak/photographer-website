import Container from '../container/container';
import './Type-of-filming.scss';
import one from './img/1.png';
import two from './img/2.png';
import tree from './img/3.png';

const TypeOfFilming = () => {
    return (
        <section className="type">
            <Container>
                <h2 className='type__title'>FROM LOVE, TO VOWS, TO FAMILY — CAPTURED WITH CARE.</h2>
                <h3 className='type__subtitle'>I photograph the moments that shape your life together.</h3>

                <ul className='type__cards'>
                    <li className='type__card'>
                        <a href="" className='type__card-link'>
                            <img src={one} alt="" className='type__card-img'/>
                            <span className='type__card-text'>couple</span>
                        </a>
                    </li>
                    <li className='type__card'>
                        <a href="" className='type__card-link'>
                            <img src={two} alt="" className='type__card-img'/>
                            <span className='type__card-text'>wedding</span>
                        </a>
                    </li>
                    <li className='type__card'>
                        <a href="" className='type__card-link'>
                            <img src={tree} alt="" className='type__card-img'/>
                            <span className='type__card-text'>family</span>
                        </a>
                    </li>
                </ul>
                <a href=""className='type__button'>Book Your Session</a>
            </Container>
        </section>
    )
}

export default TypeOfFilming;