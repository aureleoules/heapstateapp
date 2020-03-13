import React from 'react';

import button from './button.module.scss';
import { Link } from 'react-router-dom';

type Props = {
    onClick?: any
    title: string
    primary?: boolean
    secondary?: boolean
    submit?: boolean
    href?: string
    icon?: any
    width?: number | string
    disabled?: boolean
    target?: string
    external?: boolean
}

function Button(props: Props) {

    const content = <span className={props.icon ? button.withicon : ""}>{props.icon && <props.icon className={button.icon}/>} {props.title}</span>
    
    const className = [
        button.button, 
        props.primary ? button.primary: button.secondary,
        props.disabled ? button.disabled : ""
    ].join(" ");

    const style = {
        width: props.width
    }

    if(props.href) {
        if(props.external) return (
            <a target={props.target} style={style} href={props.href} className={className} onClick={props.onClick}>
                {content}
            </a>
        )
        
        return (
            <Link target={props.target} style={style} to={props.href} className={className} onClick={props.onClick}>
                {content}
            </Link>
        )
    }
    return (
        <button disabled={props.disabled} style={style} type={props.submit ? "submit": "button"} className={className} onClick={props.onClick}>
            {content}
        </button>
    )
}

Button.defaultProps = {
    primary: false,
    secondary: true,
} as Partial<Props>;

export default Button;