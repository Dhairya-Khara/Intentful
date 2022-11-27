import React from 'react'
import TechyBlinders from './../Images/TechyBlinders.png'
// import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// import {setAuth} from '../../redux/authReducer'

export default function Header() {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const dispatch = useDispatch()
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
        navigate("/");
        document.getElementById('feature').scrollIntoView();
    }

    return (
        <div className='flex page'>
            <div className = "nav left">
                <img className = "tenpercent" src={TechyBlinders} alt="Intentful" onClick={onClickImg}></img>
                <div className = "link" href="#feature"  onClick={onClickFeatures} role="button">Features</div>
                <div className="link" onClick={onClickAbout} role="button">About the Team</div>
            </div>
            <div className = "nav">
                <butto className = "newbtn" onClick={onClickLogin}>Log in</butto>
                <butto className = "newbtni" onClick={onClickLogin}>Register</butto>
            </div>
        </div>
    )
}