import React from 'react'

import Register from './components/Register'

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <h1>Intentful</h1>
                <h3>By the Techy Blinders</h3>
                <Register />
                <h2>Login</h2>
                <form>
                    <input type = "text" placeholder='email' />
                    <br></br>
                    <input type = "password" placeholder = "password" />
                    <br></br>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default LandingPage