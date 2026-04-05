import { BrowserRouter, Route, Routes } from 'react-router';
import AppHeader from './components/AppHeader/AppHeader';
import HomePage from './pages/HomePage';
import PriceAndConditions from './pages/PriceAndConditionsPage';
import AppFooter from './components/AppFooter/AppFooter';

const App = () => {
    
    return (
        <BrowserRouter>
                <AppHeader />
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
                <Route path='/price-and-conditions' element={<PriceAndConditions/>}></Route>
            </Routes>
            <AppFooter/>
        </BrowserRouter>
    );
};

export default App;
