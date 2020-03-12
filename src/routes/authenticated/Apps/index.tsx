import React from 'react';
import Button from '../../../components/Button';

import { useTranslation } from 'react-i18next';

function Apps(props: any) {
    const {t} = useTranslation();

    return (
        <div className="route apps">
            <Button primary title={t("Deploy new app")}/>
        </div>
    )
}

export default Apps;