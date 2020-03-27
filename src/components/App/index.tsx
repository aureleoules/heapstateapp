import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronRight } from '../../assets/svg/chevron-right.svg';
import AppType from '../../types/app';
import AppState from '../../types/app_state';
import { formatBytes } from '../../utils/maths';
import StatusIcon from '../StatusIcon';
import styles from './app.module.scss';



type Props = {
    app: AppType,
    onClick: any
}

function App(props: Props) {
    const {t} = useTranslation();
    const { app } = props;

    return (
        <div onClick={props.onClick} className={styles.app}>
            <div className={styles.infos}>
                <StatusIcon error={app.last_build?.error !== ""} stopped={app.state === AppState.Stopped} success={app.state === AppState.Running}/>
                <div className={styles.basicinfos}>
                    <p>{app.name}</p>
                    <small>{app.url}</small>
                </div>
                <div className={styles.lastdeploy}>
                    <p>{formatBytes(app.container_options?.max_ram!)} MB</p>
                    <small>{t('Last build')} {dayjs(app.last_build?.created_at).fromNow()}</small>
                </div>
            </div>
            <ChevronRight className={styles.action}/>
        </div>
    )
}

export default App;