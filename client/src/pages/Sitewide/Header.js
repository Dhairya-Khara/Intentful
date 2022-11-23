import React, { useState } from 'react'
import TechyBlinders from './../Images/TechyBlinders.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


import {setAuth} from '../../redux/authReducer'


export default function Header() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onClickLogin = (e) =>{
        navigate("/features")
    }

    const onClickAbout = (e) =>{
        navigate("/about")
    }

    const onClickFeatures = (e) =>{
        navigate("/features")
    }

    return (
        <div>
            <img src={TechyBlinders} alt="Intentful"></img>
            <div className="link">Features</div>
            <div className="link">About the Team</div>
            <button>Log in</button>
            <button>Register</button>
        </div>
    )
}