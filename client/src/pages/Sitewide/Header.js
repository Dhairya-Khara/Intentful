import React, { useState } from 'react'
import TechyBlinders from './../Images/TechyBlinders.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


<<<<<<< HEAD
=======
import {setAuth} from '../../redux/authReducer'


>>>>>>> 6070123 (Finalized UI)
export default function Header() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

<<<<<<< HEAD
    const onClickImg = (e) =>{
        navigate("/")
    }
    
    const onClickLogin = (e) =>{
        navigate("/login")
=======
    const onClickLogin = (e) =>{
        navigate("/features")
>>>>>>> 6070123 (Finalized UI)
    }

    const onClickAbout = (e) =>{
        navigate("/about")
    }

    const onClickFeatures = (e) =>{
<<<<<<< HEAD
        document.getElementById('feature').scrollIntoView();
    }

    return (
        <div className='flex page'>
            <div className = "nav left">
                <img className = "tenpercent" src={TechyBlinders} alt="Intentful" onClick={onClickImg}></img>
                <div href="#feature"  onClick={onClickFeatures}>Features</div>
                <div className="link" onClick={onClickAbout}>About the Team</div>
            </div>
            <div className = "nav">
                <button className = "navbtn" onClick={onClickLogin}>Log in</button>
                <button className = "navbtn" onClick={onClickLogin}>Register</button>
            </div>
=======
        navigate("/features")
    }

    return (
        <div>
            <img src={TechyBlinders} alt="Intentful"></img>
            <div className="link">Features</div>
            <div className="link">About the Team</div>
            <button>Log in</button>
            <button>Register</button>
>>>>>>> 6070123 (Finalized UI)
        </div>
    )
}