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
    error?: string
    width?: number | string
    className?: string
    defaultValue?: string
    large?: boolean
    inputClassName?: string
}

function el(props: any) {
    return <textarea {...props}/>
}

export default function Input(props: Props) {

    const inputProps = {
        placeholder: props.placeholder || props.label,
        type: props.type,
        disabled: props.disabled,
        onChange: props.onChange,
        name: props.name,
        id: props.id,
        value: props.value === undefined ? props.defaultValue : props.value,
        className: props.inputClassName

    }

    return (
        <div style={{width: props.width}} className={`input ${props.className}`}>
            {props.label && <span>{props.label}</span>}
            <div className={`input-grp`}>
                {props.large && <textarea {...inputProps}/>}

                {!props.large && <input {...inputProps}/>}
                
            </div>
            {props.error && <p className="error">{props.error}</p>}
        </div>
    )
}