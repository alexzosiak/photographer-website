import Hero from '../components/Hero/Hero';
import Emotion from '../components/Emotion/Emotion';
import Slider from '../components/Slider/Slider';
import About from '../components/About/About';
import TypeOfFilming from '../components/TypeOfFilming/TypeOfFilming';
import Advantages from '../components/Advantages/Advantages';
import Tesimonials from '../components/Tesimonials/Tesimonials';
import FormSection from '../components/form/form';

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