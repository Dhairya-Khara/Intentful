import React from 'react'
import Intentful from './../../Images/Intentful2.png'
// import { useDispatch } from 'react-redux'
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
                <img className = "tenpercent" src={Intentful} alt="Intentful" onClick={onClickImg}></img>
            </div>
            <div className='nav'>
                <LogOut></LogOut>
            </div>
        </div>
    )
}