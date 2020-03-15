// /!\ Stateful component
import React from 'react';

import styles from './navbar.module.scss';
import Logo from '../Logo';

import Avatar from '../../assets/png/avatar.png';
import { Link, useParams, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RouterState } from 'react-router-redux';

type Props = {
    app?: boolean
}

function Navbar(props: Props) {
    const {t} = useTranslation();

    interface RootState {
        router: RouterState
    }

    const router: RouterState = useSelector((state: RootState) => state.router);

    let routes: Array<any>;
    
    let showRoutes = true;
    if(router.location?.pathname === "/deploy") showRoutes = false;
    
    const { name } = useParams();
    if(props.app) {
        const rootPath = `/apps/${name}`;
        routes = [
            {
                route: rootPath,
                name: t('Overview')
            },
            {
                route: rootPath + '/builds',
                name: t('Build settings')
            },
            {
                route: rootPath + '/logs',
                name: t('Logs')
            }
        ];
    } else {
        routes = [
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
        ];
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.top}>
                <Logo link small primary/>
                <a className={styles.usertoggle} href="#">
                    <img src={Avatar}/>
                </a>
            </div>

            <div className={styles.bottom}>
                {showRoutes && <ul>
                    {routes.map((r, k) => <li key={k}>
                        <Link 
                            className={[
                                router.location && r.route === router.location.pathname ? styles.active : ""
                            ].join(" ")} 
                            to={r.route}>
                            {r.name}
                        </Link>
                    </li>)}
                </ul>}
            </div>


        </div>
    )
}

export default Navbar;