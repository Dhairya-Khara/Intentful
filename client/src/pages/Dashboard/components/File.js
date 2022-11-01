import axios from 'axios'
import React from 'react'

export default function File(props) {

    return (
        <div className='singleFile'>
            <p>{props.name}</p>
            <button>Visualize</button>
        </div>
    )
}