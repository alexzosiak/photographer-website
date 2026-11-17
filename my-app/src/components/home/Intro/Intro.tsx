import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import image from './1.png';
import './intro.scss';

const Intro = () => {
    const imageSizes = `
        (min-width: 1248px) 288px,
        (min-width: 1024px) calc((100vw - 120px) / 4),
        (min-width: 640px) calc((100vw - 96px) / 3),
        calc((100vw - 56px) / 2)
    `;

    return (
        <section className="intro">
            <h2 className="intro__title">
                Real Connection. True Emotion. Completely You.
            </h2>
            <p className="intro__description">
                Your wedding isn’t a photoshoot — it’s a celebration. No stiff
                poses, no pressure. Just light, joyful, emotional moments
                captured effortlessly as they unfold.
            </p>

            <ul className="intro__list">
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
                <li className="intro__list-item">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes={imageSizes}
                        className="intro__image"
                    />
                </li>
            </ul>

            <Link href={'/portfolio'} className="intro__button">
                Explore Full Gallery
                <ArrowRight
                    size={16}
                    className="intro__button-arrow"
                    aria-hidden="true"
                />
            </Link>
        </section>
    );
};

export default Intro;
