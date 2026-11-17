import Link from 'next/link';
import style from './app-footer.module.scss';

const AppFooter = () => {
    return (
        <footer className={style.footer}>
            <nav>
                <ul>
                    <li>testimonials</li>
                    <li>faq</li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
            
        </footer>
    );
};

export default AppFooter;
