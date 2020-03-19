import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { round } from '../../utils/maths';

type Props = {
    ram_usage: number
    max_ram: number
}

function ContainerStats(props: Props) {

    const data = {
        labels: [
            'Used RAM (MB)',
            'Available RAM (MB)'
        ],
        datasets: [{
            data: [round(props.ram_usage), round(props.max_ram - props.ram_usage)],
            backgroundColor: [
                '#ff2763'
            ],
            hoverBackgroundColor: [
                '#FF6384'
            ]
        }]
    }

    return (
        <Doughnut data={data}/>
    )
}


export default ContainerStats;