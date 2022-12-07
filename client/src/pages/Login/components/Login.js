import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


import {setAuth} from '../../../redux/authReducer'


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();



    const onFormSubmit = (e) =>{
        e.preventDefault();
        const url = `/loginUser`
        axios.post(url, {email, password}).then(async (res)=>{
            dispatch(setAuth({auth: true, token: res.data.token}))
            navigate("/dashboard")
        }).catch((error)=>{
            alert("Invalid email or password")
        })
    }

    return (
        <div className='Login' id="Login">
            <h2>Login</h2>
            <form onSubmit={onFormSubmit}>
                <div className="input">
                    <input type="text" id="register-email-input" className="input-text" placeholder="Your email" 
                    value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <label htmlFor="register-email-input" className="input-label">Email</label>
                </div>
                <br></br>
                <div className="input">
                    <input type="password" id="register-password-input" className="input-text" placeholder="Your password" 
                    value = {password} onChange = {e => setPassword(e.target.value)}/>
                    <label htmlFor="register-password-input" className="input-label">Password</label>
                </div>
                <br></br>
                <button className="newbtni log">Login</button>
            </form>
        </div>
    )
}