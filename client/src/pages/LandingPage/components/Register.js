import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    onEmailUpdate = (e) =>{
        const email = e.target.value;
        this.setState(()=>{
            return {email}
        })
    }

    onPasswordUpdate = (e) =>{
        const password = e.target.value;
        this.setState(()=>{
            return{password}
        })
    }

    onFormSubmit = (e) =>{
        e.preventDefault()
        const url = `http://localhost:8080/createUser`
        axios.post(url, {"email": this.state.email, "password": this.state.password}).then(async (res)=>{
            if(res.status === 200){
                alert("User with email " + this.state.email + " has been created.")
                this.setState(()=>{
                    return({
                        email: "",
                        password: ""
                    })
                })
            }
            else{
                alert("Error")
            }
        })
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit = {this.onFormSubmit}>
                    <input type="text" placeholder='email' onChange = {this.onEmailUpdate} value = {this.state.email}/>
                    <br></br>
                    <input type="password" placeholder="password" onChange = {this.onPasswordUpdate} value = {this.state.password}/>
                    <br></br>
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default Register