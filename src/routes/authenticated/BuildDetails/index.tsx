import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../../actions';
import Input from '../../../components/Input';
import Navbar from '../../../components/Navbar';
import StatusIcon from '../../../components/StatusIcon';
import Build from '../../../types/build';
import DeployStatus from '../../../types/deploy_status';
import styles from './builddetails.module.scss';

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
    }, [dispatch, name, id]);


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