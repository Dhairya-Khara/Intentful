import React from 'react'
import { Bubble } from 'react-chartjs-2';
import RandomColor from 'randomcolor';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
    SubTitle
} from 'chart.js';

ChartJS.register(
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    SubTitle
);

export const options = {
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    }
};

// export const data = {
//     datasets: [
//         {
//             label: 'get_hamburger',
//             data: Array.from({ length: 1 }, () => ({
//                 x: 45,
//                 y: 50,
//                 r: 150,
//             })),
//             backgroundColor: RandomColor(),
//         },
//         {
//             label: 'get_fries',
//             data: Array.from({ length: 1 }, () => ({
//                 x: 47.5,
//                 y: 50,
//                 r: 90,
//             })),
//             backgroundColor: RandomColor(),
//         },
//         {
//             label: 'start_payment',
//             data: Array.from({ length: 1 }, () => ({
//                 x: 50,
//                 y: 50,
//                 r: 50,
//             })),
//             backgroundColor: RandomColor(),
//         },
//     ],
// };




class BubbleChart extends React.Component {

    constructor() {
        super()

        this.state = {
            data: {
                datasets: [
                    {
                        label: 'get_hamburger',
                        data: Array.from({ length: 1 }, () => ({
                            x: Math.random() * 900,
                            y: Math.random() * 500,
                            r: 80,
                        })),
                        backgroundColor: RandomColor(),
                    },
                    {
                        label: 'get_fries',
                        data: Array.from({ length: 1 }, () => ({
                            x: Math.random() * 900,
                            y: Math.random() * 500,
                            r: 160,
                        })),
                        backgroundColor: RandomColor(),
                    },
                    {
                        label: 'start_payment',
                        data: Array.from({ length: 1 }, () => ({
                            x: Math.random() * 900,
                            y: Math.random() * 500,
                            r: 240,
                        })),
                        backgroundColor: RandomColor(),
                    },
                ]
            }
        }
    }

    render() {
        return (
            <div>
                <Bubble
                    options={options}
                    data={this.state.data}
                />
            </div>
        )
    }

}

export default BubbleChart