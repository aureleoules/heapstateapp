import React from 'react';
import Logo from '../../../components/Logo';

type Props = any;

function Dashboard(props : Props) {
    return (
        <div className="route dashboard">
            <Logo primary absolute small/>
            Dashboard
        </div>
    )
}

export default Dashboard;