import React from 'react';
import './styles.scss';

type Props = {
    label?: string,
    placeholder?: string,
    disabled?: boolean
    onChange?: any
    id?: string
    name?: string
    value?: any
    type?: string
    action?: object
    error?: string
}

export default function Input(props: Props) {
    return (
        <div className="input">
            {props.label && <span>{props.label}</span>}
            <div className="input-grp">
                <input 
                    placeholder={props.placeholder || props.label}
                    type={props.type} 
                    disabled={props.disabled}
                    onChange={props.onChange} 
                    name={props.name} 
                    id={props.id} 
                    value={props.value}
                />
                {props.action}
            </div>
            {props.error && <p className="error">{props.error}</p>}
        </div>
    )
}