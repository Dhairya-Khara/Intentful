import React from 'react'

import Register from './components/Register'
import Login from './components/Login'


export default function LandingPage() {
    return (
        <div>
            <center class = "gradient-wrapper">
                <Register />
                <br></br>
                <Login />
            </center>
        </div>
    )
}

// export default LandingPage