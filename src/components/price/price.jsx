import './price.scss';
import img1 from './img/Rectangle-15.png';
import img2 from './img/Rectangle-16.png';
import img3 from './img/Rectangle-17.png';


const api = async () => {
    try {
        const response = await fetch('src/database.json');

        const data = await response.json();
        return await data;

    } catch(err) {
        console.error(err);
    }
  
}

const Price = () => {

    const s = api();
    console.log(s)

    return (
        <section className='price'>
            <h2 className='price__title'>wedding pricing packages</h2>
            <ul className='price__list'>
                <li className='price__card'>
                    <img className='price__card-img' src={img1} alt="" />
                    <h3 className='price__card-title'></h3>
                    <ul className='price__card-list'>
                        <li  className='price__card-item'>
                            <span>1 hour of shooting</span>
                        </li>
                         <li className='price__card-item'> 
                            <span>Assistance in selecting a location and styling</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Artistic editing of all photos (60+) with light retouching</span>
                        </li>
                        <li className='price__card-item'>
                            <span>Final photos ready in 10-15 days (delivered via an online gallery)</span>
                        </li>
                    </ul>
                    <span className='price__card-price'>160 $</span>
                </li>
                <li className='price__card'>
                    <img className='price__card-img' src={img2} alt="" />
                    <h3 className='price__card-title'>STANDART</h3>
                    <ul className='price__card-list'>
                        <li className='price__card-item'>
                            <span>2 hours of shooting</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Assistance in selecting a location and styling</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Artistic editing of all photos (100+) with light retouching</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Final photos ready within 10-20 days (delivered via an online gallery)</span>
                        </li>
                    </ul>
                    <span className='price__card-price'>250 $</span>
                </li>
                <li className='price__card'>
                    <img className='price__card-img' src={img3} alt="" />
                    <h3 className='price__card-title'>MAXIMUM</h3>
                    <ul className='price__card-list'>
                        <li className='price__card-item'>
                            <span>Duration: from 3 hours</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Price for an additional hour: 80€</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Assistance in selecting a location and styling</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Artistic editing of all photos (150+) with light retouching</span>
                        </li>
                         <li className='price__card-item'>
                            <span>Final photos ready within 1 month</span>
                        </li>
                          <li className='price__card-item'>
                            <span>A preview of 15 photos within 5 days</span>
                        </li>
                          <li className='price__card-item'>
                            <span>Personalized USB drive</span>
                        </li>
                    </ul>
                    <span className='price__card-price'>160 $</span>
                </li>
                
            </ul>
        </section>
    )
}

export default Price;