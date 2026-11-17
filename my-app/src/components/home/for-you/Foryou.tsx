import Image from "next/image";
import fox from './1.png';
import './foryou.scss';

const ForYou = () => {
    return (
        <section className="foryou">
            <div className="foryou__container">
                <div className="foryou__content">
                    <h2 className="foryou__content-title">This is for you if...</h2>
                    <ul className="foryou__content-list">
                        <li className="foryou__content-item">you want natural, emotional photographs, not stiff poses or over-edited images.</li>
                        <li className="foryou__content-item">you want a photographer who truly cares and feels your story, not just shows up with a camera.</li>
                        <li className="foryou__content-item">you want to forget about posing completely and simply live your day — while it’s captured beautifully.</li>
                        <li className="foryou__content-item">you want photos that help you remember how it felt, not only how it looked.</li>
                        <li className="foryou__content-item">you want images that will move you to tears, laughter and joy, even years from now.</li>
                    </ul>
                </div>
                <Image src={fox} alt="Fox" className="foryou__img" sizes="(max-width: 426px) calc(100vw - 82px), 346px"/>
            </div>
        </section>
    );
};

export default ForYou;
