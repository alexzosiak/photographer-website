import Hero from '@/components/hero/Hero';
import Emotion from '@/components/emotion/Emotion';
import Slider from '@/components/slider/Slider';
import About from '@/components/about/About';
import TypeOfFilming from '@/components/typeOfFilming/TypeOfFilming';
import Advantages from '@/components/advantages/Advantages';
import Tesimonials from '@/components/tesimonials/Tesimonials';
import Form from '@/components/app-form/Form';

export default function Home() {
    return (
        <>
            <Hero/>
            <Emotion/>
            <Slider/>
            <About/>
            <TypeOfFilming/>
            <Advantages/>
            <Tesimonials/>
            <Form/>
        </>
    );
}
