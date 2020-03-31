import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export function confirmModal(ui: any) {
    const root = document.getElementById("root");

    const options = {
        childrenElement: () => <div />,
        customUI: (props: any) => ui(() => {
                props.onClose();
                root!.classList.remove("blur");
            }
        ),
        closeOnEscape: true,
        closeOnClickOutside: true,
        afterClose: () => root!.classList.remove("blur"),
    };
    confirmAlert(options);
    root!.classList.add("blur");
} 
