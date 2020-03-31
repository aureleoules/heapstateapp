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
import EnvVar from '../../../types/env_var';
import { confirmModal } from '../../../utils/modal';



function BuildSettings(props: any) {

    const {t} = useTranslation();
    
    const dispatch = useDispatch();

    interface RootState {
        apps: any
        env: Array<EnvVar>
        build_options: BuildOptions
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const buildOptions: BuildOptions = appReducer.build_options;
    const env: Array<EnvVar> = appReducer.env;
    const branch: string = appReducer.branch;

    const {name} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchBuildOptions(name!))
    }, [dispatch, name]);

    function deploy() {
        confirmModal((close: any) =>
        <div className="custom-modal">
            <h2>{t('Force deploy?')}</h2>
            <p>{t('Are you sure that you want to force a deployment?')}</p>

            <div className={"actions"}>
                <Button 
                    onClick={() => {
                            dispatch(appActions.forceDeploy(name!));
                            close();
                        }
                    } 
                    small 
                    primary 
                    title={t('Force deploy')}
                />
                <Button onClick={close} small cancel title={t('Cancel')}/>
            </div>
        </div>);
    }

    if(env.length > 0 && env[env.length-1].key !== "" && env[env.length-1].value !== "") {
        dispatch(appActions.addEnvVar());
    }

    if(env.length > 1) {
        for(let i = 0; i < env.length; i++) {
            if(env[i].key === "" && env[i].value === "" && i !== env.length-1) {
                dispatch(appActions.removeEnvVar(i));
            }
        }
    }

    function setKey(key: string, i: number) {
        dispatch(appActions.setEnvVarKey(key, i));
    }

    function setValue(value: string, i: number) {
        dispatch(appActions.setEnvVarValue(value, i));
    }

    function save() {
        confirmModal((close: any) =>
        <div className="custom-modal">
            <h2>{t('Save build options?')}</h2>
            <p>{t('Are you sure that you want to save these build options?')}</p>

            <div className={"actions"}>
                <Button 
                    onClick={() => {
                        _save(); 
                        close();}
                    }
                    small 
                    primary 
                    title={t('Save')}
                />
                <Button onClick={close} small cancel title={t('Cancel')}/>
            </div>
        </div>);
    }

    function _save() {
        const buildOptions: BuildOptions = {
            branch,
            // Exclude last, which is empty
            env: env.slice(0, -1)
        }
        dispatch(appActions.saveBuildOptions(name!, buildOptions));
    }

    return (
        <>
            <Navbar app/>
            {appReducer.build_options && <div className={`${styles.builds} route`}>
                <div className={`container ${styles.container}`}>
                    <h3>{t('Builds settings')}</h3>
                    <Input 
                        label={t('Branch')} 
                        onChange={(e: any) => dispatch(appActions.setBranch(e.target.value))}
                        value={branch}
                    />
                    <div className={styles['env-vars']}>
                        <h3>{t('Environnement variables')}</h3>
                        {env.map((v, i) => (
                            <div key={i} className={styles['env-var']}>
                                <Input onChange={(e: any) => setKey(e.target.value, i)} value={v.key} className={styles.key} label={t('Key')}/>
                                <Input onChange={(e: any) => setValue(e.target.value, i)} value={v.value} className={styles.value} label={t('Value')}/>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <Button onClick={save} primary title={t('Save')}/>
                        <Button onClick={deploy} title={t('Force deploy')}/>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default BuildSettings;