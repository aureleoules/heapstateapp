import React, { useEffect } from 'react';
import styles from './edit-app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

import {ReactComponent as CheckIcon} from '../../../assets/svg/check.svg';
import { appActions } from '../../../actions';
import { useParams } from 'react-router';
import App from '../../../types/app';
import Navbar from '../../../components/Navbar';

function EditApp(props: any) {
    
    const {t} = useTranslation();
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const app: App = appReducer.app;
    
    const {name} = useParams();
    useEffect(() => {
        dispatch(appActions.fetchApp(name!))
    }, []);

    return (
        <>
            <Navbar app/>
            <div className={styles['edit-app'] + " route"}>
                {appReducer.app && <div className={styles.container}>
                    <div className={`${styles['app-infos']} container`}>
                        <h3>{app.name}</h3>
                        <a target="_blank" href={"https://" + app.url}>{app.url}</a>
                        <p><CheckIcon className={styles.check}/> Deployed from GitHub. Last build on March 12.</p>

                        <div className={styles.actions}>
                            <Button href={`/apps/${name}/builds`} small primary title={t('Build settings')}/>
                            <Button small title={t('Environnement variables')}/>
                        </div>
                    </div>
                    <div className={`${styles['recent-builds']} container`}>
                        <h3>{t('Builds')}</h3>
                    </div>
                </div>}
            </div> 
        </>
    )
}

export default EditApp;