import { BrowserRouter, Route, Routes } from 'react-router';
import Header from '../Header/header';
import HomePage from '../pages/homePage';
import PriceAndConditions from '../pages/priceAndConditionsPage';
import Footer from '../footer/footer';

const App = () => {
    return (
        <BrowserRouter>
                <Header />
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
