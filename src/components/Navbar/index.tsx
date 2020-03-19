// /!\ Stateful component
import React from 'react';

import styles from './navbar.module.scss';
import Logo from '../Logo';

import Avatar from '../../assets/png/avatar.png';
import { Link, useParams, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RouterState } from 'react-router-redux';
import {ReactComponent as PlusIcon} from '../../assets/svg/plus-circle.svg';
import {ReactComponent as SatoshiIcon} from '../../assets/svg/satoshi.svg';


type Props = {
    app?: boolean
}

function Navbar(props: Props) {
    const {t} = useTranslation();

    interface RootState {
        router: RouterState,
        users: any
    }

    const router: RouterState = useSelector((state: RootState) => state.router);
    const users: any = useSelector((state: RootState) => state.users);

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
                route: rootPath + '/container',
                name: t('Container'),
            },
            {
                route: rootPath + '/options',
                name: t('Build settings')
            },
            {
                route: rootPath + '/builds',
                name: t('Builds')
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
                <div className={styles['logo-beta']}>
                    <Logo link small primary/>
                    <p>BETA</p>
                </div>
                <div className={styles.usertoggle}>
                    {users.profile && <Link className={styles.credits} to="/profile">
                        {users.profile.credits.toLocaleString()} 
                        <SatoshiIcon/>
                        {/* <Link to="/profile">
                            <PlusIcon/>
                        </Link> */}
                    </Link>}
                    <Link to="/profile">
                        <img src={Avatar}/>
                    </Link>
                </div>
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