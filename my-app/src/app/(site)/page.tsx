import Hero from '@/components/home-page/Hero/Hero';
import Intro from '@/components/home-page/Intro/Intro';
import About from '@/components/home-page/about/About';
import ForYou from '@/components/home-page/for-you/Foryou';
import ContactCta from '@/components/home-page/contact-cta/Contact-cta';
import Testimonials from '@/components/home-page/testimonials/Testimonials';
import SectionDivider from '@/components/shared/devider/Devider';
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

