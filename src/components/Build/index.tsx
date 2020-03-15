import React from 'react';
import styles from './build.module.scss';
import Build from '../../types/build';
import {ReactComponent as CheckIcon} from '../../assets/svg/check.svg';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

function BuildView(props: Build) {
    return (
        <div className={styles.build}>
            <p>
                <CheckIcon className={styles.check}/> <span>{props.branch}@{props.commit_hash.substr(0, 8)}</span> 
            </p>
            <small>
                {dayjs(props.created_at).fromNow()}: {props.commit_message}
            </small>
        </div>
    )
}

export default BuildView;