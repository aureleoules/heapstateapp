import React from 'react';
import './styles.scss';
type Props = {
    image?: boolean
    primary?: boolean
}

export default function Logo(props: Props) {
    return (
        <div className="logo">
            <h1 className={props.primary ? "primary" : ""}>heapstack</h1>
        </div>
    )
}