import React from 'react'

import Register from './components/Register'
import Login from './components/Login'
import BubbleChart from '../Dashboard/components/BubbleChart'


export default function LandingPage(){
    return(
        <div>
            <Register />
            <br></br>
            <Login />
            <BubbleChart/>
        </div>
    )
}

// export default LandingPage