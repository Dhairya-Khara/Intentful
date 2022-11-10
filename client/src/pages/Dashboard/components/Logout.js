import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { setAuth } from '../../../redux/authReducer'

export default function Logout() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)


    const onButtonClick = (e) => {
        e.preventDefault();

        dispatch(setAuth({ auth: false, token: '' }))
        navigate("/")

    }

    return (
        <div>
            <button onClick={onButtonClick} className="top-right-corner">Logout</button>
        </div>
    )
}