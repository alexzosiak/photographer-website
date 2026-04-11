
import './advantages.scss';

const Advantages = () => {
    return (
        <section className="advantages">
            <div className='container'>
                <div className="advantages__card">
                    <h2 className='advantages__card-title'>This is for you if…</h2>
                    <ul className="advantages__card-list">
                        <li className="advantages__card-item">you want natural, emotional photographs, not stiff poses or over-edited images.</li>
                        <li className="advantages__card-item">you want a photographer who truly cares and feels your story, not just shows up with a camera.</li>
                        <li className="advantages__card-item">you want to forget about posing completely and simply live your day — while it’s captured beautifully.</li>
                        <li className="advantages__card-item">you want photos that help you remember how it felt, not only how it looked.</li>
                        <li className="advantages__card-item">you want images that will move you to tears, laughter and joy, even years from now.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Advantages;