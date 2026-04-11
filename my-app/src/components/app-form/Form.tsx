import Image from 'next/image';
import './form.scss';
import photo from './Vika.png';

const Form = () => {
    return (
        <form action='submit' className="form">
            <div>
                <label htmlFor="name">First Name</label>
                <input type="text" name="name" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="data">Date</label>
                <input type="date" name="data" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="location">Where's the Party?</label>
                <input type="text" name="location" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="more-info">Tell Me More!</label>
                <input type="text" name="more-info" id="" className='form__input'/>
            </div>
            <div>
                <label htmlFor="instagram">Are you on Instagram? Let's connect!</label>
                <input type="text" name="instagram" id="" className='form__input'/>
            </div>
            <button type="submit" className='form__button'>Submit</button>
        </form>
    );
};

const FormSection = () => {
    return (
        <section className='form-section'>
            <div className='container'>
                <div className="form-section__wrapper">
                    <Image src={photo} alt="" className="form-section__img"/> 
                    <div>
                        <h2 className="form-section__title">BE IN TOUCH</h2>
                        <Form/>
                    </div>                
                </div>
            </div>
        </section>
    );
};

export default FormSection;
