// /!\ Stateful component
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RouterState } from 'react-router-redux';
import Avatar from '../../assets/png/avatar.png';
import Logo from '../Logo';
import styles from './navbar.module.scss';

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
                    <Link to="/profile">
                        <img alt="avatar" src={Avatar}/>
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