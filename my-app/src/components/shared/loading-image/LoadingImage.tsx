'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import Skeleton from '../skeleton/Skeleton';
import styles from './loading-image.module.scss';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    wrapperClassName?: string;
};

function ImageWithState({ wrapperClassName = '', className = '', onLoad, onError, alt, ...props }: Props) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        if (image?.complete) {
            setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
        }
    }, []);

    return (
        <div className={`${styles.frame} ${wrapperClassName}`} data-state={status} aria-busy={status === 'loading'}>
            {status === 'loading' && <Skeleton className={styles.placeholder} />}
            <img
                {...props}
                ref={imageRef}
                alt={alt}
                className={`${styles.image} ${className}`}
                onLoad={(event) => {
                    setStatus('loaded');
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setStatus('error');
                    onError?.(event);
                }}
            />
            {status === 'error' && (
                <span className={styles.error} role="status">Photo unavailable</span>
            )}
        </div>
    );
}

export default function LoadingImage(props: Props) {
    // A new source gets its own loading state, including when navigating the lightbox.
    return <ImageWithState key={props.src} {...props} />;
}
