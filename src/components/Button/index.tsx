import React, { HTMLAttributes, ButtonHTMLAttributes } from 'react';

import './styles.scss';

type Props = {
    onClick?: any
    title: string
    primary?: boolean
    secondary?: boolean
    submit?: boolean
}

function Button(props: Props) {
    return (
        <button type={props.submit ? "submit": "button"} className={
            [
                "button", 
                props.primary ? "primary": "secondary",
            ].join(" ")} onClick={props.onClick}>
            {props.title}
        </button>
    )
}

Button.defaultProps = {
    primary: false,
    secondary: true
} as Partial<Props>;

export default Button;