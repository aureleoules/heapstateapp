import React from 'react';
import { Link } from 'react-router-dom';
import button from './button.module.scss';


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
    small?: boolean
    danger?: boolean
    success?: boolean
    cancel?: boolean
    rel?: string
}

function Button(props: Props) {

    const content = <div className={`${props.icon ? button.withicon : ""} ${button.content}`}>{props.icon && <props.icon className={button.icon}/>} {props.title}</div>
    
    const className = [
        button.button, 
        props.primary ? button.primary: "",
        props.disabled ? button.disabled : "",
        props.small ? button.small : "",
        props.danger ? button.danger : "",
        props.success ? button.success : "",
        props.cancel ? button.cancel : "",

        !props.primary && !props.danger && !props.success && !props.cancel ? button.secondary : "" 
    ].join(" ");

    const style = {
        width: props.width
    }

    if(props.href) {
        if(props.external) return (
            <a rel={props.rel} target={props.target} style={style} href={props.href} className={className} onClick={props.onClick}>
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
    small: false
} as Partial<Props>;

export default Button;