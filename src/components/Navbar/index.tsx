// /!\ Stateful component
import React from 'react';

import styles from './navbar.module.scss';
import Logo from '../Logo';

import Avatar from '../../assets/png/avatar.png';
import { Link, Router } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RouterState } from 'react-router-redux';

function Navbar(props: any) {
    const {t} = useTranslation();

    const routes = [
        {
            route: "/",
            name: t('Apps')
        },
        {
            route: '/usage',
            name: t('Usage')
        },
        {
            route: '/settings',
            name: t('Settings')
        }
    ]


    interface RootState {
        router: RouterState
    }

    const router: RouterState = useSelector((state: RootState) => state.router);
    console.log(router);

    return (
        <div className={styles.navbar}>
            <div className={styles.top}>
                <Logo small primary/>
                <a className={styles.usertoggle} href="#">
                    <img src={Avatar}/>
                </a>
            </div>

            <div className={styles.bottom}>
                <ul>
                    {routes.map((r, k) => <li key={k}>
                        <Link 
                            className={[
                                router.location && r.route === router.location.pathname ? styles.active : ""
                            ].join(" ")} 
                            to={r.route}>
                            {r.name}
                        </Link>
                    </li>)}
                </ul>
            </div>


        </div>
    )
}

export default Navbar;