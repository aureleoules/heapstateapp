import React from 'react';
import {ReactComponent as CheckIcon} from '../../assets/svg/check.svg';
import {ReactComponent as CrossIcon} from '../../assets/svg/x.svg';
import {ReactComponent as MoonIcon} from '../../assets/svg/moon.svg';

import styles from './status.module.scss';

type Props = {
    success?: boolean
    stopped?: boolean
    error?: boolean
}

function StatusIcon(props: Props) {
    if(props.error) {
        return <CrossIcon className={`${styles.status} ${styles.error}`}/>;
    }
    if(props.stopped) {
        return <MoonIcon className={`${styles.status} ${styles.sleeping}`}/>;
    }

    return <CheckIcon className={`${styles.status} ${styles.success}`}/>;
}

export default StatusIcon;