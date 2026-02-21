import Hero from '../hero/hero';
import Emotion from '../emotion/emotion';
import Slider from '../slider/slider';
import About from '../about/about';
import TypeOfFilming from '../type-of-filming/type-of-filming';
import Advantages from '../advantages/advantages';
import Tesimonials from '../tesimonials/tesimonials';
import FormSection from '../form/form';

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Emotion/>
            <Slider/>
            <About/>
            <TypeOfFilming/> 
            <Advantages/>
            <Tesimonials/>
            <FormSection/>
        </main>
    )
}

export default HomePage;