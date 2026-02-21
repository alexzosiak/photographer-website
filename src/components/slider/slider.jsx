import './slider.scss';
import one from './img/1.png';
import two from './img/2.png';
import tree from './img/3.png';
import four from './img/4.png';
import five from './img/5.png';

const Slider = () => {
    return (
        <section className='slider'>
            <ul className='slider__list'>
                <li><img src={one} alt="" /></li>
                <li><img src={two} alt="" /></li>
                <li><img src={tree} alt="" /></li>
                <li><img src={four} alt="" /></li>
                <li><img src={five} alt="" /></li>            
            </ul>
        </section>
    )
}

export default Slider;