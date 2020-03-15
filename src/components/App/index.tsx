import React from 'react';
import styles from './app.module.scss';
import AppType from '../../types/app';
import { useTranslation } from 'react-i18next';
import {ReactComponent as ChevronRight} from '../../assets/svg/chevron-right.svg';

import {ReactComponent as CheckIcon} from '../../assets/svg/check.svg';
import {ReactComponent as CrossIcon} from '../../assets/svg/x.svg';

type Props = {
    app: AppType,
    onClick: any
}

function App(props: Props) {
    const {t} = useTranslation();
    const { app } = props;
    return (
        <div onClick={props.onClick} className={styles.app}>
            {/* TODO: build status */}
            <CheckIcon className={styles.check}/>
            {/* <CrossIcon className={styles.cross}/> */}
            <div className={styles.infos}>
                <div className={styles.basicinfos}>
                    <p>{app.name}</p>
                    <small>{app.url}</small>
                </div>
                <div className={styles.lastdeploy}>
                    <p>6.53 MB / 64 MB</p>
                    <small>Last build: 3 months ago</small>
                </div>
            </div>
            <ChevronRight className={styles.action}/>
        </div>
    )
}

export default App;