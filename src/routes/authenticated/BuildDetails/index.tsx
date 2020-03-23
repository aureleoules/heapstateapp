import React, { useEffect } from 'react';
import styles from './builddetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

import { appActions } from '../../../actions';
import { useParams } from 'react-router';
import Navbar from '../../../components/Navbar';
import Build from '../../../types/build';
import Input from '../../../components/Input';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import StatusIcon from '../../../components/StatusIcon';
import DeployStatus from '../../../types/deploy_status';
dayjs.extend(relativeTime)

function BuildDetails(props: any) {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    interface RootState {
        apps: any
    }
    const appReducer: any = useSelector((state: RootState) => state.apps);
    
    const build: Build = appReducer.build;
    
    const {name, id} = useParams();

    useEffect(() => {
        dispatch(appActions.fetchBuild(name!, id!))
    }, []);


    return (
        <>
            <Navbar app/>
            <div className={`route ${styles['build-details']}`}>
                {build && <div className={`container`}>
                    <h3><StatusIcon success={build.status === DeployStatus.Deployed}/> <span>{t('Build')} {build.branch}@{build.commit_hash.substr(0, 8)}</span> </h3>

                    <p>
                        {dayjs(build.created_at).fromNow()}: {build.commit_message}
                    </p>
                    <Input label={t('Branch')} value={build.branch} disabled/>
                    <Input 
                        inputClassName={"log-box"} 
                        large 
                        label={t('Logs')} 
                        disabled 
                        value={build.logs.join("\n")}/>
                </div>}
            </div>
        </>
    )
}

export default BuildDetails;