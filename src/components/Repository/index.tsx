import React from 'react';
import styles from './repository.module.scss';

import {ReactComponent as ChevronRight} from '../../assets/svg/chevron-right.svg';
import {ReactComponent as X} from '../../assets/svg/x.svg';

type Props = {
    name: string
    icon: any
    onClick: any
    selected?: boolean
}

function Repository(props: Props) {
    return (
        <div onClick={props.onClick} className={[
                styles.repository,
                props.selected ? styles.selected : ""
            ].join(" ")}>
            <props.icon/>
            <p>{props.name}</p>
            {!props.selected && <ChevronRight className={styles.action}/>}
            {props.selected && <X className={styles.action}/>}

        </div>
    )
}

export default Repository;