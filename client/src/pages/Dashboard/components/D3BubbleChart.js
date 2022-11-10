import ForceGraph from './ForceGraph'
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function D3BubbleChart(props) {

    const [data, setData] = useState({})


    let dataSoFar = { "datasets": [] }

    const refreshData = () => {
        for (const intent in props.intents) {
            dataSoFar["datasets"].push({
                id: intent,
                r: props.intents[intent][0] * 20
            })
        }
        setData(dataSoFar)
    }


    useEffect(() => {
        refreshData()
    }, [props.intents])




    let size = Object.keys(data).length;

    if (size === 0) {
        return (<p></p>)
    }
    else {
        return (
            <div>
                <svg width="1600" height="600">
                    <ForceGraph nodes={data.datasets} maxRadius={/*maxSoFar*/ 60} />
                </svg>
            </div>)


    }
}
