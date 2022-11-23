import React, { useState } from 'react'
import TechyBlinders from './../Images/TechyBlinders.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


export default function Header() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onClickImg = (e) =>{
        navigate("/")
    }
    
    const onClickLogin = (e) =>{
        navigate("/login")
    }

    const onClickAbout = (e) =>{
        navigate("/about")
    }

    const onClickFeatures = (e) =>{
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
        </div>
    )
}