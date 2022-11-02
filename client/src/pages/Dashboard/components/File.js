import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

export default function File(props) {
    const url = `http://localhost:8080/getOneTranscriptIntents?name=${props.name}`
    const token = useSelector((state) => state.auth.token)
    console.log(url)
    const visualizeData = () => {
        axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            console.log(res.data)
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <div className='singleFile'>
            <p>{props.name}</p>
            <button onClick={visualizeData}>Visualize</button>
        </div>
    )
}