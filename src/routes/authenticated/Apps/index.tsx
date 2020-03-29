import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../actions';
import AppView from '../../../components/App';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Navbar from '../../../components/Navbar';
import history from '../../../history';
import App from '../../../types/app';
import styles from './apps.module.scss';

function Apps(props: any) {
    const {t} = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Heapstate - ${t('Apps')}`;
        dispatch(appActions.fetchApps());
    }, [dispatch]);

    interface RootState {
        apps: {
            apps: Array<App>
        }
    }

    const appsReducer: any = useSelector((state: RootState) => state.apps);

    return (
        <>
            <Navbar/>
            <div className={"route " + styles.apps}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <Input placeholder={t('Search')}/>
                        <Button href="/deploy" primary title={t("Deploy new app")}/>
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