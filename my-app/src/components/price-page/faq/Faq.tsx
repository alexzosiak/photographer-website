'use client';

import { useId, useState } from 'react';
import styles from './faq.module.scss';

const faqItems = [
    {
        id: 'booking',
        question: 'How can I book a photoshoot?',
        answer: [
            'Get in touch with me via the contact form or Instagram.',
            'Tell me about your idea, preferred date, and location.',
            'Choose the package that suits you best.',
            'Confirm your booking with a deposit.',
            'Your photoshoot is officially booked – I’ll take care of the rest.',
        ],
    },
    {
        id: 'video',
        question: 'Do you also offer video services?',
        answer: 'If you would like video coverage, please mention it when you get in touch so we can discuss the options for your shoot.',
    },
    {
        id: 'extra-hours',
        question: 'What if I need more hours than included in the package?',
        answer: 'Let me know how much coverage you need, and we can discuss additional hours, availability, and pricing before confirming your booking.',
    },
    {
        id: 'editing',
        question: 'Who selects the photos for editing, and is it possible to receive the original (unedited) images?',
        answer: 'We can discuss the photo selection process and whether unedited images are available before your shoot, so you know exactly what your package includes.',
    },
    {
        id: 'privacy',
        question: 'Do I need to pay extra for photo privacy?',
        answer: 'Please mention any privacy preferences when booking. We can agree on how your images may be used and confirm any related terms in advance.',
    },
    {
        id: 'delivery',
        question: 'How will I receive my photos?',
        answer: 'We will confirm the delivery method and turnaround time for your chosen package when booking.',
    },
    {
        id: 'outfits',
        question: 'How should we dress for the photoshoot?',
        answer: 'Choose outfits you feel comfortable in. Soft, coordinated colours and simple textures photograph beautifully. Avoid large logos or busy patterns, and feel free to share your outfit ideas with me before the shoot.',
    },
];

const Faq = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);
    const sectionId = useId();

    return (
        <section className={styles.faq} aria-labelledby={`${sectionId}-title`}>
            <h2 id={`${sectionId}-title`} className={styles.faq__title}>FAQ</h2>

            <ul className={styles.faq__list}>
                {faqItems.map(({ id, question, answer }) => {
                    const isOpen = openItem === id;
                    const questionId = `${sectionId}-${id}-question`;
                    const answerId = `${sectionId}-${id}-answer`;

                    return (
                        <li key={id} className={styles.faq__item}>
                            <h3 className={styles.faq__question}>
                                <button
                                    id={questionId}
                                    type="button"
                                    className={styles.faq__trigger}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    onClick={() => setOpenItem(isOpen ? null : id)}
                                >
                                    <span className={styles.faq__questionText}>{question}</span>
                                    <span className={styles.faq__icon} aria-hidden="true" />
                                </button>
                            </h3>

                            <div
                                id={answerId}
                                className={styles.faq__panel}
                                data-open={isOpen}
                                role="region"
                                aria-labelledby={questionId}
                                aria-hidden={!isOpen}
                                inert={!isOpen}
                            >
                                <div className={styles.faq__panelInner}>
                                    <div className={styles.faq__answer}>
                                        {Array.isArray(answer) ? (
                                            <ol className={styles.faq__steps}>
                                                {answer.map((step) => <li key={step}>{step}</li>)}
                                            </ol>
                                        ) : <p>{answer}</p>}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Faq;
