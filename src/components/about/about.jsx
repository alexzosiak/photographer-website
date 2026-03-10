import Container from '../container/container';
import './About.scss';
import viktoria from './Viktoria.png'

const About = () => {
    return (
        <section className='about'>
            <Container>
                <div className='about__container'>
                    <div className='about__wrapper'>
                        <h2 className='about__title'>Hello, I’m Viktoria</h2>
                        <p className='about__text'>Ukrainian wedding and family photographer based in Ireland.</p>
                        <p className='about__text'>My photography is about real moments, honest emotions, and the quiet in between. It’s not about being perfect, but about what truly matters. I believe authenticity is the most beautiful thing there is.</p>
                        <p className='about__text'>During every photoshoot, my focus is on the people in front of my camera. I take time to connect, to be fully present, and to create a calm, comfortable space where you can relax and simply be yourselves. This is how natural, meaningful photographs come to life.</p>
                        <p className='about__text'>I care deeply about everyone who chooses me as their photographer. I guide you through the preparation, help with details, and support you throughout the process, so you can let go of the stress and enjoy the moment. My goal is for you to feel present, comfortable, and free to fully experience your day — while I quietly capture it as it unfolds.</p>
                    </div>
                    <img src={viktoria} alt="viktoria" className='about__img'/>
                </div>
            </Container>
        </section>
    )
}

export default About;