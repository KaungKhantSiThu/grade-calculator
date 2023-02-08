import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import React from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart(props) {
    const {data} = props;

    const options =  {
        responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                    text: 'Line Chart for GPA per Semester',
            },
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                        suggestedMax: 4
                }
            }
        }
    }

    return(
        <Line options={options} data={data.data}/>
    )
}
