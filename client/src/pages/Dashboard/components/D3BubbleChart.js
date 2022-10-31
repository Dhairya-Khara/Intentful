import ForceGraph from './ForceGraph'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function D3BubbleChart() {
    const [data, setData] = useState({})
    const token = useSelector((state) => state.auth.token)
    const url = "http://localhost:8080/getIntents"

    // let maxSoFar = 0
    
    let dataSoFar = { "datasets": [] }

    useEffect(() => {
        async function getData() {
            axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
                for (const intent in res.data) {
                    dataSoFar["datasets"].push({
                        id: intent,
                        r: res.data[intent][0] * 20
                    })
                    /*
                    Need to implement simple function to store the maximum radius to pass in the return to <ForceGraph> 
                    */
                    // if(maxSoFar < res.data[intent][0]* 10){
                    //     maxSoFar = res.data[intent][0] * 10
                    // }
                }
                setData(dataSoFar)
            }).catch((error) => {
                alert(error)
            })
        }
        getData()
    }, [])

    const refreshData = () => {
        axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            for (const intent in res.data) {
                dataSoFar["datasets"].push({
                    id: intent,
                    r: res.data[intent][0] * 20
                })
            }
            setData(dataSoFar)
        }).catch((error) => {
            alert(error)
        })
    }

    let size = Object.keys(data).length;

    if (size === 0) {
        return (<p></p>)
    }
    else {
        return (
            <div>
                <h1>Single Transcript Intents</h1>
                <svg width="1600" height="600">
                    <ForceGraph nodes={data.datasets} maxRadius={/*maxSoFar*/ 40} />
                </svg>
            </div>)


    }
}
