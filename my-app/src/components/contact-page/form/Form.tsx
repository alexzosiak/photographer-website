'use client';

import Image from 'next/image';
import { useId, useRef, useState, type FormEvent } from 'react';
import portrait from '@/components/app-form/Vika.png';
import styles from './form.module.scss';

const fields = [
    { name: 'names', label: "Your and your partner’s name", type: 'text', placeholder: 'e.g. Sarah & Liam', autoComplete: 'name', required: true, maxLength: 160, fullWidth: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email', required: true, maxLength: 254 },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+353 …', autoComplete: 'tel', maxLength: 50 },
    { name: 'location', label: 'Where’s the party?', type: 'text', placeholder: 'Venue or County in Ireland', maxLength: 200 },
    { name: 'message', label: 'Tell me more!', type: 'textarea', placeholder: 'Tell me about your plans, ideas, and what you would love me to capture.', maxLength: 5000, fullWidth: true },
    { name: 'instagram', label: 'Are you on Instagram? Let’s connect!', type: 'text', placeholder: '@yourhandle', maxLength: 100, fullWidth: true },
] as const;

type FieldName = (typeof fields)[number]['name'];
type FieldErrors = Partial<Record<FieldName, string>>;

type FormProps = {
    initialMessage?: string;
    minDate: string;
};

const Form = ({ initialMessage = '', minDate }: FormProps) => {
    const id = useId();
    const summaryRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<FieldErrors>({});
    const submittingRef = useRef(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submittingRef.current) return;
        const form = event.currentTarget;
        const nextErrors: FieldErrors = {};

        for (const field of fields) {
            const input = form.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement;
            if ('required' in field && field.required && !input.value.trim()) {
                nextErrors[field.name] = field.name === 'names' ? 'Please enter your name(s).' : 'Please enter your email address.';
            } else if (input.validity.typeMismatch) {
                nextErrors[field.name] = 'Please enter a valid email address.';
            } else if (input.validity.rangeUnderflow) {
                nextErrors[field.name] = 'Please choose today or a future date.';
            } else if (!input.validity.valid) {
                nextErrors[field.name] = 'Please check this field and enter a valid value.';
            }
        }

        setErrors(nextErrors);
        setStatus('idle');
        setSubmitError('');
        if (Object.keys(nextErrors).length > 0) {
            // Wait for the error summary to be rendered before moving focus.
            requestAnimationFrame(() => summaryRef.current?.focus());
            return;
        }

        const data = Object.fromEntries(new FormData(form));
        submittingRef.current = true;
        setStatus('sending');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok || result.success !== true) {
                if (result.errors) {
                    setErrors(result.errors);
                    requestAnimationFrame(() => summaryRef.current?.focus());
                }
                throw new Error(result.error || 'Your message could not be sent. Please try again.');
            }
            form.reset();
            setStatus('success');
        } catch (error) {
            setStatus('error');
            setSubmitError(error instanceof Error ? error.message : 'Please check your connection and try again.');
        } finally {
            submittingRef.current = false;
        }
    };

    return (
        <section id="contact-form" className={styles.form} aria-labelledby={`${id}-title`}>
            <div className={styles.form__card}>
                <Image
                    className={styles.form__portrait}
                    src={portrait}
                    alt="Viktoria Mokina, photographer"
                    sizes="(max-width: 800px) 85vw, 35vw"
                />

                <div className={styles.form__content}>
                    <header className={styles.form__header}>
                        <h2 id={`${id}-title`} className={styles.form__title}>Be in touch</h2>
                        <p className={styles.form__intro}>
                            Fill in the form below and I will get back to you within 24 hours.
                        </p>
                    </header>

                    <form
                        className={styles.form__fields}
                        aria-labelledby={`${id}-title`}
                        aria-describedby={`${id}-instructions`}
                        aria-busy={status === 'sending'}
                        noValidate
                        onSubmit={handleSubmit}
                        onChange={() => {
                            if (status !== 'sending') setStatus('idle');
                        }}
                    >
                        <p id={`${id}-instructions`} className={styles.form__instructions}>
                            Fields marked with * are required.
                        </p>
                        <div className={styles.form__honeypot} aria-hidden="true" inert>
                            <label htmlFor={`${id}-website`}>Leave this field empty</label>
                            <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                        </div>

                        {Object.values(errors).some(Boolean) && (
                            <div ref={summaryRef} className={styles.form__errors} role="alert" tabIndex={-1}>
                                <p>Please check the following fields:</p>
                                <ul>
                                    {fields.filter((field) => errors[field.name]).map((field) => (
                                        <li key={field.name}>
                                            <a href={`#${id}-${field.name}`}>{field.label}: {errors[field.name]}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {fields.map((field) => {
                            const error = errors[field.name];
                            const inputProps = {
                                id: `${id}-${field.name}`,
                                name: field.name,
                                className: styles.form__input,
                                required: 'required' in field ? field.required : false,
                                placeholder: 'placeholder' in field ? field.placeholder : undefined,
                                maxLength: 'maxLength' in field ? field.maxLength : undefined,
                                disabled: status === 'sending',
                                'aria-invalid': error ? true as const : undefined,
                                'aria-describedby': error ? `${id}-${field.name}-error` : undefined,
                                onChange: () => setErrors((current) => ({ ...current, [field.name]: undefined })),
                            };

                            return (
                                <div
                                    key={field.name}
                                    className={styles.form__field}
                                    data-full-width={'fullWidth' in field && field.fullWidth}
                                >
                                    <label htmlFor={inputProps.id} className={styles.form__label}>
                                        {field.label}{'required' in field && field.required && <span aria-hidden="true"> *</span>}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea {...inputProps} rows={4} defaultValue={initialMessage} />
                                    ) : (
                                        <input
                                            {...inputProps}
                                            type={field.type}
                                            autoComplete={'autoComplete' in field ? field.autoComplete : undefined}
                                            min={field.type === 'date' ? minDate : undefined}
                                        />
                                    )}
                                    {error && <p id={inputProps['aria-describedby']} className={styles.form__fieldError}>{error}</p>}
                                </div>
                            );
                        })}

                        <button type="submit" className={styles.form__submit} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending…' : 'Submit'}
                        </button>
                        <div className={styles.form__status} role="status" aria-atomic="true">
                            {status === 'sending' && <p>Sending your message…</p>}
                            {status === 'success' && <p>Thank you! Your enquiry has been sent. I will get back to you within 24 hours.</p>}
                        </div>
                        {status === 'error' && <p className={styles.form__sendError} role="alert">{submitError}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Form;
