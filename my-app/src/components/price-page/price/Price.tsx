import Image from 'next/image';
import Link from 'next/link';
import miniImage from '@/test-img/1.png';
import styles from './price.module.scss';

const packages = [
    {
        id: 'mini',
        image: miniImage,
        title: 'Mini',
        description: [
            '1 hour of shooting',
            'Assistance in selecting a location and styling',
            'Artistic editing of all photos (60+) with light retouching',
            'Final photos ready in 10–15 days (delivered via an online gallery)',
        ],
        price: 160,
    },
    {
        id: 'standart',
        image: miniImage,
        title: 'Standart',
        description: [
            '2 hours of shooting',
            'Assistance in selecting a location and styling',
            'Artistic editing of all photos (100+) with light retouching',
            'Final photos ready within 10–20 days (delivered via an online gallery)',
        ],
        price: 250,
    },
    {
        id: 'maximum',
        image: miniImage,
        title: 'Maximum',
        description: [
            'Duration: from 3 hours',
            'Price for an additional hour: 50€',
            'Assistance in selecting a location and styling',
            'Artistic editing of all photos (150+) with light retouching',
            'Final photos ready within 1 month',
            'A preview of 15 photos within 5 days',
            'Personalized USB drive',
        ],
        price: 350,
    },
];

const Price = () => {
    return (
        <section className={styles.price} aria-labelledby="wedding-pricing-title">
            <h1 id="wedding-pricing-title" className={styles.price__title}>
                Wedding Pricing Packages
            </h1>

            <div className={styles.price__container}>
            <ul className={styles.price__packages}>
                {packages.map(({ id, image, title, description, price }) => (
                    <li key={id} className={styles.price__card}>
                        <Image
                            className={styles.price__image}
                            src={image}
                            alt={`Wedding ${title}`}
                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 400px"
                        />
                        <h2 className={styles.price__packageTitle}>{title}</h2>
                        <ul className={styles.price__features}>
                            {description.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                        <div className={styles.price__footer}>
                            <p className={styles.price__amount}>{price} €</p>
                            <Link
                                className={styles.price__bookButton}
                                href={`/contact?package=${id}#contact-form`}
                                aria-label={`Book the ${title} wedding package`}
                            >
                                Book date
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </section>
    );
};

export default Price;
