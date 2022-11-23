import React from 'react'

import Register from './components/Register'
import Login from './components/Login'


const LoginForm = ({ isShowLogin }) => {
    return (
      <div className={`${isShowLogin ? "active" : ""} show`}>
        <div>
            <center className = "gradient-wrapper">
                <Register />
                <br></br>
                <Login />
            </center>
        </div>
    </div>
    )
}

export default LoginForm