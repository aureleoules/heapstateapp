import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../../actions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Navbar from '../../../components/Navbar';
import BuildOptions from '../../../types/build_options';
import styles from './buildsettings.module.scss';



function BuildSettings(props: any) {

    const {t} = useTranslation();
    
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const buildOptions: BuildOptions = appReducer.build_options;
    
    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchBuildOptions(name!))
    }, [dispatch, name]);

    const [branch, setBranch] = useState<string>();

    function deploy() {
        dispatch(appActions.forceDeploy(name!));
    }

    return (
        <>
            <Navbar app/>
            {appReducer.build_options && <div className={`${styles.builds} route`}>
                <div className={`container ${styles.container}`}>
                    <h3>{t('Builds settings')}</h3>
                    <Input 
                        defaultValue={buildOptions.branch}
                        label={t('Branch')} 
                        onChange={(e: any) => setBranch(e.target.value)}
                        value={branch}
                    />
                    <div className={styles['env-vars']}>
                        <h3>{t('Environnement variables')}</h3>
                        <div className={styles['env-var']}>
                            <Input className={styles.key} label={t('Key')}/>
                            <Input className={styles.value} label={t('Value')}/>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button primary title={t('Save')}/>
                        <Button onClick={deploy} title={t('Force deploy')}/>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default BuildSettings;