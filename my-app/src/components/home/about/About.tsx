import Image from 'next/image';
import Victoria from './Viktoria.png';
import './about.scss';
const About = () => {
    return (
        <section className="about">
            <div className="about__container">
                <Image
                    src={Victoria}
                    alt="Viktoria, wedding and family photographer"
                    className="about__image"
                    sizes="(max-width: 448px) 100vw, 448px"
                />
                <div className="about__content">
                    <h2 className="about__title">About Your Photographer</h2>
                    <h2 className="about__dics">Hello, I’m Viktoria</h2>
                    <h3 className="about__subtitle">
                        Ukrainian wedding and family photographer based in
                        Ireland.
                    </h3>
                    <div className="about__text-container">
                        <p className="about__text">
                            My photography is about real moments, honest
                            emotions, and the quiet in between. It’s not about
                            being perfect, but about what truly matters. I
                            believe authenticity is the most beautiful thing
                            there is.
                        </p>
                        <p className="about__text">
                            During every photoshoot, my focus is on the people
                            in front of my camera. I take time to connect, to be
                            fully present, and to create a calm, comfortable
                            space where you can relax and simply be yourselves.
                        </p>
                        <p className="about__text">
                            {' '}
                            I care deeply about everyone who chooses me as their
                            photographer. I guide you through the preparation,
                            help with details, and support you throughout the
                            process, so you can let go of the stress and enjoy
                            the moment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
