import styles from './photographer-quote.module.scss';
const PhotographerQuote = () => {
    return (
        <section className={styles.quote}>
            <blockquote className={styles.text}>
                “Photography begins where my heart opens — to you, your story,
                and the emotions you’ll feel again and again.”
            </blockquote>

            <p className={styles.author}>— Your photographer</p>
        </section>
    );
};

export default PhotographerQuote;
