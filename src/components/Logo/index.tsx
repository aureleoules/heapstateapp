import React from 'react';
import './styles.scss';
import {ReactComponent as LogoImage} from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';

type Props = {
    image?: boolean
    primary?: boolean,
    absolute?: boolean,
    small?: boolean
    link?: boolean
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
            {!props.image && (props.link ? 
                <Link 
                    to="/" 
                    className={props.primary ? "primary" : ""}>
                        heapstate
                </Link>
                : <h1 
                    className={props.primary ? "primary" : ""}>
                       heapstate
                </h1>
            )}
        </div>
    )
}