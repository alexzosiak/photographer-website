import Image from 'next/image';
import './emotion.scss';
import emotion from './emotion.png';

const Emotion = () => {
    return (
        <section className="emotion">
            <div className='container'>
                <h2 className="emotion__title">
                    Joyful Wedding Photography - <br></br> Real Moments, No
                    Awkward Posing
                </h2>
                <article className="emotion__card">
                    <Image
                        src={emotion}
                        alt="emotion"
                        className="emotion__card-img"
                    />
                    <div className="emotion__card-wrapper">
                        <h3 className="emotion__card-title">
                            Connection, Emotion, 100% You
                        </h3>
                        <p className="emotion__card-text">
                            You already know your wedding will the best day of
                            your life, full of laughter, teary-eyed hugs and so
                            much love.
                        </p>
                        <p className="emotion__card-text">
                            You’re ready to be present for every single moment,
                            without a worry that you’ll miss the party because
                            you’re spending too long on posed, awkward photos.
                        </p>
                        <p className="emotion__card-text">
                            Instead, when you work with me, you can have your
                            cake and eat it, too. Your photos will capture the
                            candid moments and the real emotions. They will keep
                            you smiling about this magical day long after the
                            actual cake is enjoyed and gone.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Emotion;
