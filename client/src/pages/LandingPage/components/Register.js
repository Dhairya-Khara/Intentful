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
                    <div class="Input">
                        <input type="text" id="input" class="Input-text" placeholder="Your email, e.g. MrWonderful@cs.toronto.edu" 
                        value = {this.state.email} onChange = {this.onEmailUpdate}/>
                        <label for="input" class="Input-label">Email</label>
                    </div>
                    <br></br>
                    <div class="Input">
                        <input type="password" id="input1" class="Input-text" placeholder="Your password, e.g. #Wonderful123" 
                        value = {this.state.password} onChange = {this.onPasswordUpdate}/>
                        <label for="input1" class="Input-label">Password</label>
                    </div>
                    <br></br>
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default Register