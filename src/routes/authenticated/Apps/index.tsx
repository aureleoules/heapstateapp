import React, { useEffect } from 'react';
import Button from '../../../components/Button';

import { useTranslation } from 'react-i18next';

import styles from './apps.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../actions';
import App from '../../../types/app';
import AppView from '../../../components/App';
import Input from '../../../components/Input';
import history from '../../../history';
import Navbar from '../../../components/Navbar';

function Apps(props: any) {
    const {t} = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.fetchApps());
    }, []);

    interface RootState {
        apps: {
            apps: Array<App>
        }
    }

    const appsReducer: any = useSelector((state: RootState) => state.apps);
    console.log("apps", appsReducer.apps);
    return (
        <>
            <Navbar/>
            <div className={"route " + styles.apps}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <Input width={"80%"} placeholder={t('Search')}/>
                        <Button width={"15%"} href="/deploy" primary title={t("Deploy new app")}/>
                    </div>
                    <div className={styles.list}>
                        {appsReducer.apps.map((app: App, k: number) => (
                            <AppView 
                                key={k}
                                onClick={() => history.push('/apps/' + app.name)} 
                                app={app} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Apps;