import Image from 'next/image';
import './slider.scss';
import one from './img/1.png';
import two from './img/2.png';
import tree from './img/3.png';
import four from './img/4.png';
import five from './img/5.png';

// need to chenge names on 
const Slider = () => {
    return (
        <section className='slider'>
            <ul className='slider__list'>
                <li><Image src={one} alt="" /></li>
                <li><Image src={two} alt="" /></li>
                <li><Image src={tree} alt="" /></li>
                <li><Image src={four} alt="" /></li>
                <li><Image src={five} alt="" /></li>            
            </ul>
        </section>
    )
}

export default Slider;