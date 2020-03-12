import React from 'react';
import './styles.scss';
import {ReactComponent as LogoImage} from '../../assets/svg/logo.svg';

type Props = {
    image?: boolean
    primary?: boolean,
    absolute?: boolean
}


export default function Logo(props: Props) {
    if(props.image) return (
        <div className={"logo " + (props.absolute ? "absolute" : "")}>
            <LogoImage width={80} height={80}/>
        </div>
    )
    return (
        <div className="logo">
            <h1 className={props.primary ? "primary" : ""}>heapstack</h1>
        </div>
    )
}