import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import {setAuth} from '../../../redux/authReducer'

export default function Logout() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)


    const onButtonClick = (e) =>{
        e.preventDefault();
        const url = `http://localhost:8080/logoutUser`


        axios.post(url, {}, {headers: {"Authorization": "Bearer " + token}}).then(async (res)=>{
            dispatch(setAuth({auth: false, token: ''}))
            navigate("/")
        }).catch((error)=>{
            alert("Not Authenticated")
        })
    }

    return (
        <div>
            <button onClick={onButtonClick}>Logout</button>
        </div>
    )
}