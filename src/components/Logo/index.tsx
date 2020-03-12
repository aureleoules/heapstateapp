import React from 'react';
import './styles.scss';
import {ReactComponent as LogoImage} from '../../assets/svg/logo.svg';

type Props = {
    image?: boolean
    primary?: boolean,
    absolute?: boolean,
    small?: boolean
}

export default function Logo(props: Props) {
    return (
        <div className={
            [
                "logo",
                props.absolute ? "absolute" : "",
                props.small ? "small": ""
            ].join(" ")}>
            {props.image && <LogoImage width={80} height={80}/>}
            {!props.image && <h1 className={props.primary ? "primary" : ""}>heapstack</h1>}
        </div>
    )
}