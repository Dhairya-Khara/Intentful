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
        const url = `http://localhost:8080/loginUser?email=${email}&password=${password}`
        axios.post(url).then(async (res)=>{
            console.log(res.data.token)
            dispatch(setAuth({auth: true, token: res.data.token}))
            navigate("/dashboard")
        }).catch((error)=>{
            alert("Invalid email or password")
        })
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder='email' value = {email} onChange = {e => setEmail(e.target.value)}/>
                <br></br>
                <input type="password" placeholder="password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                <br></br>
                <button>Login</button>
            </form>
        </div>
    )
}