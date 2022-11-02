import axios from 'axios'
import React from 'react'

export default function File(props) {
    const visualizeData = () => {
        props.onButtonPress(true)
    }

    return (
        <div className='singleFile'>
            <p>{props.name}</p>
            <button onClick={visualizeData}>Visualize</button>
        </div>
    )
}