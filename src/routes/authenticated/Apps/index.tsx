import React from 'react';
import Button from '../../../components/Button';

import { useTranslation } from 'react-i18next';

import apps from './apps.module.scss';

function Apps(props: any) {
    const {t} = useTranslation();

    return (
        <div className={"route " + apps.apps}>
            <div className={apps.container}>
                <Button href="/deploy" primary title={t("Deploy new app")}/>
            </div>
        </div>
    )
}

export default Apps;