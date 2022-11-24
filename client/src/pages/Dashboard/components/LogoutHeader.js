import React, { useState } from 'react'
import TechyBlinders from './../../Images/TechyBlinders.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import LogOut from './Logout'


export default function LogoutHeader() {
    const navigate = useNavigate();

    const onClickImg = (e) =>{
        navigate("/")
    }

    return (
        <div className='flex page'>
            <div className = "nav left">
                <img className = "tenpercent" src={TechyBlinders} alt="Intentful" onClick={onClickImg}></img>
            </div>
            <div className='nav'>
                <LogOut></LogOut>
            </div>
        </div>
    )
}