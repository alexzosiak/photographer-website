import Hero from '@/components/home/Hero/Hero';
import Intro from '@/components/home/Intro/Intro';
import About from '@/components/home/about/About';
import ForYou from '@/components/home/for-you/Foryou';
import ContactCta from '@/components/home/contact-cta/Contact-cta';
import Testimonials from '@/components/home/testimonials/Testimonials';

import SectionDivider from '@/components/shared/devider/Devider';

import Emotion from '@/components/emotion/Emotion';
import Slider from '@/components/slider/Slider';

import TypeOfFilming from '@/components/typeOfFilming/TypeOfFilming';
import Advantages from '@/components/advantages/Advantages';
import Tesimonials from '@/components/tesimonials/Tesimonials';
import Form from '@/components/app-form/Form';
import AppFooter from '@/components/shared/app-footer/AppFooter';


export default function Home() {
    return (
        <>
            <Hero />
            <Intro />
            <SectionDivider/>
            <About/>
            <SectionDivider/>
            <ForYou/>
            <SectionDivider/>
            <Testimonials/>
            <SectionDivider/>
            <ContactCta/>
            <AppFooter/>
        </>
    );
}
{/* <Hero/>
            <Emotion/>
            <Slider/>
            <About/>
            <TypeOfFilming/>
            <Advantages/>
            <Tesimonials/>
            <Form/> */}
