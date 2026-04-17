import style from './contacts-info.module.scss';

const ContactsInfo = () => {
    return (
        <section className={style.contacts}>
            <h2 className={style.contacts__title}>
                LET’S CREATE SOMETHING BEAUTIFUL TOGETHER!
            </h2>
            <h3 className={style.contacts__subtitle}>
                Have questions or want to book a shoot? I’d love to hear from
                you.
            </h3>

            <div className={style.contacts__info}>
                <p>Instagram:</p>
                <a href="https://www.instagram.com/photographer_dublin/">@mokina_photography</a>
            </div>
            <div className={style.contacts__info}>
                <p>WhatsApp:</p>
                <a href="tel:+353 87 002 76 86">+353 87 002 76 86</a>
            </div>

            <div className={style.contacts__info}>
                <p>Location:</p>
                <address>
                    Based in Wexford. Available for travel across Ireland and
                    beyond.
                </address>
            </div>
        </section>
    );
};

export default ContactsInfo;
