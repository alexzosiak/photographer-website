import Link from "next/link";
import style from './app-navigation.module.scss';

const AppNavigation = (): JSX.Element => {
    return (
        <nav className={style.navigation}>
                <ul className={style.navigation__list}>
                    <li className={style.navigation__item}>
                        <Link href='/' className={style.navigation__link}>
                            home
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link
                            href='/price'
                            className={style.navigation__link}
                        >
                            pricing & conditions
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link href="/portfolio" className={style.navigation__link}>
                            portfolio
                        </Link>
                    </li>
                    <li className={style.navigation__item}>
                        <Link href="/contact" className={style.navigation__link}>
                            contact
                        </Link>
                    </li>
                </ul>
         
        </nav>
    );
};

export default AppNavigation;