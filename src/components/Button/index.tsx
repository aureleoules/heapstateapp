import React from 'react';

import './styles.scss';

type Props = {
    onClick?: any
    title: string
    primary?: boolean
    secondary?: boolean
}

function Button(props: Props) {
    return (
        <button className={
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