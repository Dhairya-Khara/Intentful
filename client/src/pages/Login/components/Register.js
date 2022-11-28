import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    onEmailUpdate = (e) => {
        const email = e.target.value;
        this.setState(() => {
            return { email }
        })
    }

    onPasswordUpdate = (e) => {
        const password = e.target.value;
        this.setState(() => {
            return { password }
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const url = `http://localhost:8080/createUser`
        axios.post(url, { "email": this.state.email, "password": this.state.password }).then(async (res) => {

            alert("User with email " + this.state.email + " has been created.")
            this.setState(() => {
                return ({
                    email: "",
                    password: ""
                })
            })

        }).catch((e) => {
            alert('Invalid email')
        })
    }

    render() {
        return (
            <div className='Register' id="Register">
                <h2>Register</h2>
                <form onSubmit={this.onFormSubmit}>
                    <div className="input">
                        <input type="text" id="login-email-input" className="input-text" placeholder="Your email"
                            value={this.state.email} onChange={this.onEmailUpdate} />
                        <label htmlFor="login-email-input" className="input-label">Email</label>
                    </div>
                    <br></br>
                    <div className="input">
                        <input type="password" id="login-password-input" className="input-text" placeholder="Your password"
                            value={this.state.password} onChange={this.onPasswordUpdate} />
                        <label htmlFor="login-password-input" className="input-label">Password</label>
                    </div>
                    <br></br>
                    <button className="newbtni reg">Register</button>
                </form>
            </div>
        )
    }
}

export default Register