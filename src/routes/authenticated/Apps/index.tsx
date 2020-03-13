import React, { useEffect } from 'react';
import Button from '../../../components/Button';

import { useTranslation } from 'react-i18next';

import apps from './apps.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../actions';

function Apps(props: any) {
    const {t} = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.fetchApps());
    }, []);

    interface RootState {
        apps: object
    }

    const appsState: object = useSelector((state: RootState) => state.apps);


    return (
        <div className={"route " + apps.apps}>
            <div className={apps.container}>
                <Button href="/deploy" primary title={t("Deploy new app")}/>
            </div>
        </div>
    )
}

export default Apps;