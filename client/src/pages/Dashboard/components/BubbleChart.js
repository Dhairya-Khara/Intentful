import React, { useState, useEffect } from 'react'
import { Bubble } from 'react-chartjs-2';
import RandomColor from 'randomcolor';
import axios from 'axios'
import { useSelector } from 'react-redux'

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

export default function BubbleChart() {
    const [data, setData] = useState({})
    const token = useSelector((state) => state.auth.token)

    const url = "http://localhost:8080/getIntents"

    let dataSoFar = { "datasets": [] }

    // useEffect(() => {
    //     async function getData() {
    //         axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
    //             for (const intent in res.data) {
    //                 dataSoFar["datasets"].push({
    //                     label: intent,
    //                     data: Array.from({ length: 1 }, () => ({
    //                         x: Math.random() * 900,
    //                         y: Math.random() * 500,
    //                         r: res.data[intent][0] * 80
    //                     })),
    //                     backgroundColor: RandomColor()
    //                 })
    //             }
    //             setData(dataSoFar)
    //         }).catch((error) => {
    //             alert(error)
    //         })
    //     }
    //     getData()
    // }, [])

    const refreshData = () => {
        axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            for (const intent in res.data) {
                dataSoFar["datasets"].push({
                    label: intent,
                    data: Array.from({ length: 1 }, () => ({
                        x: Math.random() * 900,
                        y: Math.random() * 500,
                        r: res.data[intent][0] * 80
                    })),
                    backgroundColor: RandomColor()
                })
            }
            setData(dataSoFar)
        }).catch((error) => {
            alert(error)
        })
    }


    let size = Object.keys(data).length;
    if (size === 0) {
        return (<p>BUBBLE CHART</p>)
    }
    else {
        return (<div>
            <button onClick={refreshData}>Refresh view</button>
            <Bubble options={options} data={data} />

        </div>)
    }
}
