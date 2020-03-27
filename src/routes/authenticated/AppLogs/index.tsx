import React, { useEffect } from 'react';
import Navbar from '../../../components/Navbar';

import styles from './logs.module.scss';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../../../actions';
import { useParams } from 'react-router';

function AppLogs(props: any) {

    const {t} = useTranslation();
    
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);    
    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchLogs(name!))
    }, [dispatch, name]);

      return (
        <>
            <Navbar app/>
            <div className={`route ${styles.logs}`}>
                <div className={`container ${styles['logs-container']}`}>
                    <h3>{t('Logs')}</h3>
                    <Input
                        inputClassName={"log-box"} 
                        large 
                        disabled 
                        value={appReducer.logs}
					/>
                </div>
            </div>
        </>
    )
}

export default AppLogs;