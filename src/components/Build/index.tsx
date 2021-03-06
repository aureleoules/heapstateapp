import React from 'react';
import styles from './build.module.scss';
import Build from '../../types/build';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import {ReactComponent as ChevronRight} from '../../assets/svg/chevron-right.svg';
import { Link } from 'react-router-dom';
import StatusIcon from '../StatusIcon';
import DeployStatus from '../../types/deploy_status';
dayjs.extend(relativeTime)

type Props = {
    build: Build,
    url: string
}

function BuildView(props: Props) {

    const build = props.build;

    return (
        <Link to={props.url} className={styles.build}>
            <p>
                <StatusIcon success={build.status === DeployStatus.Deployed}/> <span>{build.branch}@{build.commit_hash.substr(0, 8)}</span> 
            </p>
            <small>
                {dayjs(build.created_at).fromNow()}: {build.commit_message}
            </small>

            <ChevronRight className={styles.action}/>

        </Link>
    )
}

export default BuildView;