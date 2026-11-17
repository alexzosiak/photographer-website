import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './contact-cta.scss';

const ContactCta = () => {
    return (
        <section className="contact-cta">
            <span className="contact-cta__eyebrow">Your Story Begins Here</span>
            <h2 className="contact-cta__title">Ready to tell your love story? Let’s create something timeless together.</h2>
            <p className="contact-cta__description">Tell me about your celebration, your vision, and your date — I would love to hear from you.</p>
            <Link href={'/contact'} className="contact-cta__button">Get in touch 
            <ArrowRight
                    size={16}
                    className="contact-cta__button-arrow"
                    aria-hidden="true"
                /></Link>
        </section>
    )
}

export default ContactCta;
