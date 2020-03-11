import React from 'react';

interface Props {
    image: boolean
}

export default function Logo(props: Props) {
    return (
        <div className="logo">
            <h1>heapstack</h1>
        </div>
    )
}