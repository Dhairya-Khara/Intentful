// The Facade class to the ForceGraph component which implements D3
// The Builder class arranging the attributes for the complex ForceGraph component implemented concretely in ForceGraph.js
import ForceGraph from './ForceGraph'
import React, { useState, useEffect } from 'react'
import useWindowDimensions from './GetWindowSize'

export default function D3BubbleChart(props) {

    const { height, width } = useWindowDimensions();

    let maxSoFar = 0;
    let count = 0;

    for (const intent in props.intents){
        if (props.intents[intent][0] > maxSoFar){
            maxSoFar = props.intents[intent][0]
        }
        count++
    }
    console.log(count)
    console.log(maxSoFar)
    let radiusMultiplier = Math.min(10, width/(maxSoFar*count))
    console.log(radiusMultiplier)

    const [data, setData] = useState({})

    let dataSoFar = { "datasets": [] }

    const refreshData = () => {
        for (const intent in props.intents) {
            dataSoFar["datasets"].push({
                id: intent,
                r: props.intents[intent][0] * radiusMultiplier
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
            <div width="1500" height="1000">
                <svg width={width} height={height}>
                    <ForceGraph nodes={data.datasets}  width={width} height={height}/>
                </svg>
            </div>)


    }
}
