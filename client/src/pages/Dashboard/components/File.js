import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

export default function File(props) {
    const url = `/getOneTranscriptIntents?name=${props.name}`
    const token = useSelector((state) => state.auth.token)
    const visualizeData = () => {
        axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            props.setBubbleChart({ show: true, intents: res.data })
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <div className='single-file'>
            <p>{props.name}</p>
            <button onClick={visualizeData} className="newbtni file">Visualize</button>
        </div>
    )
}