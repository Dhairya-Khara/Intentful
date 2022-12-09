
import ForceGraph from './ForceGraph'
import React, {useState, useEffect} from 'react'
import useWindowDimensions from './GetWindowSize'

export default function D3BubbleChart(props) {

    const { height, width } = useWindowDimensions();

    //width = 2*width/3
    let maxSoFar = 0;
    let count = 0;

    for (const intent in props.intents){
        if (props.intents[intent][0] > maxSoFar){
            maxSoFar = props.intents[intent][0]
        }
        count++
    }

    let radiusMultiplier = Math.min(15, width/(maxSoFar*count))

    const [data, setData] = useState({})

    let dataSoFar = { "datasets": [] }

    const refreshData = () => {
        for (const intent in props.intents) {
            dataSoFar["datasets"].push({
                id: intent + "," + props.intents[intent][0] + "," + Object.entries(props.intents[intent][1]),
                r: props.intents[intent][0] * radiusMultiplier,
                frequency: props.intents[intent][0],
                associates: props.intents[intent][1]
            })
        }
        setData(dataSoFar)
    }

    useEffect(() => {
        refreshData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.intents]);

    let size = Object.keys(data).length;

    

    if (size === 0) {
        return (<p></p>)
    }
    else {
        return (
                <ForceGraph nodes={data.datasets}  width={3*width/2} height={1.2*height}/>)


    }
}
