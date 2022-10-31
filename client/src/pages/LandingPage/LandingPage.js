import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import classes from './LandingPage.module.css'


export default function LandingPage(){
    return(
        <div>
            <center>
                <header className = {classes.header}>
                Intentful Visualisation
                </header>
                <Register />
                <br></br>
                <Login />
            </center>
            
        </div>
    )
}
