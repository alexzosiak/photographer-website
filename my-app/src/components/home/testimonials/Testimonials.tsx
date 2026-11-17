'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import weddingPhoto from '../../tesimonials/2.png';
import styles from './testimonials.module.scss';

const testimonials = [
    {
        name: 'Andrew and Pippa',
        occasion: 'Wedding in Ireland',
        quote: 'Wow, Victoria, the photos are absolutely incredible! You are so talented! Truly talented! We are amazed! It was such a pleasure working with you.',
        image: weddingPhoto,
    },
    {
        name: 'Andrew and Pippa',
        occasion: 'Wedding in Ireland',
        quote: 'Booking Victoria again was the best decision we made, and we couldn’t be happier with the results. Her dedication, creativity, and passion for photography truly stand out in her work. We highly recommend Mokina Photography to anyone looking to capture precious moments perfectly. We will definitely be booking her again in the future.',
        image: weddingPhoto,
    },
    {
        name: 'Andrew and Pippa',
        occasion: 'Wedding in Ireland',
        quote: 'Booking Victoria again was the best decision we made, and we couldn’t be happier with the results. Her dedication, creativity, and passion for photography truly stand out in her work. We highly recommend Mokina Photography to anyone looking to capture precious moments perfectly. We will definitely be booking her again in the future.',
        image: weddingPhoto,
    },
    {
        name: 'Andrew and Pippa',
        occasion: 'Wedding in Ireland',
        quote: 'Booking Victoria again was the best decision we made, and we couldn’t be happier with the results. Her dedication, creativity, and passion for photography truly stand out in her work. We highly recommend Mokina Photography to anyone looking to capture precious moments perfectly. We will definitely be booking her again in the future.',
        image: weddingPhoto,
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const id = useId();
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % testimonials.length);
        }, 10_000);

        return () => window.clearInterval(intervalId);
    }, []);

    const move = (direction: number) => {
        setActiveIndex((index) => (index + direction + testimonials.length) % testimonials.length);
    };

    const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex = index;

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % testimonials.length;
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + testimonials.length) % testimonials.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = testimonials.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        setActiveIndex(nextIndex);
        tabs.current[nextIndex]?.focus();
    };

    return (
        <section className={styles.testimonials} aria-labelledby={`${id}-title`}>
            <div className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>Kind words</span>
                    <h2 id={`${id}-title`} className={styles.title}>Testimonials</h2>
                </div>
                <div className={styles.controls}>
                    <button type="button" className={styles.arrow} onClick={() => move(-1)} aria-label="Previous testimonial">
                        <ArrowLeft size={22} strokeWidth={1.25} aria-hidden="true" />
                    </button>
                    <button type="button" className={styles.arrow} onClick={() => move(1)} aria-label="Next testimonial">
                        <ArrowRight size={22} strokeWidth={1.25} aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${activeIndex}`} tabIndex={0} className={styles.panel} aria-live="polite">
                {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className={`${styles.card} ${activeIndex === index ? styles.cardActive : ''}`}
                    aria-hidden={activeIndex !== index}
                    inert={activeIndex !== index}
                >
                    <Image
                        src={testimonial.image}
                        alt={`${testimonial.name} on their wedding day`}
                        className={styles.image}
                        sizes="(max-width: 700px) calc(100vw - 80px), (max-width: 1280px) 36vw, 400px"
                    />
                    <div className={styles.content}>
                        <span className={styles.quoteMark} aria-hidden="true">“</span>
                        <blockquote className={styles.quote}>
                            <p>{testimonial.quote}</p>
                        </blockquote>
                        <div className={styles.author}>
                            <div>
                                <p className={styles.name}>{testimonial.name}</p>
                                <p className={styles.occasion}>{testimonial.occasion}</p>
                            </div>
                            <span className={styles.counter} aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}>
                                {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
