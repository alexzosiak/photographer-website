
import AppNavigation from "../app-navigation/AppNavigation";

import './app-header.scss';

const AppHeader = () => {
    
    return (
        <header className="header">
            <div className="header__container">
                <AppNavigation />
            </div>
        </header>   
    )        
};

export default AppHeader;
