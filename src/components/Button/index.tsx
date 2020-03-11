import React from 'react';

interface Props {
    onClick: () => void
    title: String
}

export default function Button(props: Props) {
    return (
        <button onClick={props.onClick}>
            {props.title}
        </button>
    )
}