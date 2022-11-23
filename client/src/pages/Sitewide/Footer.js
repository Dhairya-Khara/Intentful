import React from 'react'
import Intentful from './../Images/Intentful.png'
import { useNavigate } from "react-router-dom";

export default function Footer() {

    const navigate = useNavigate;

    const onClickImg = (e) =>{
        navigate("/")
    }

    return (
        <div className='nav foot page'>
            <img src={Intentful} className = "fifteenpercent" alt="Techy Blinders Logo"  onClick={onClickImg}></img>
            <div className="footer-text">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            © The Techy Blinders, Inc. 2022. All rights reserved. Use of
            this site constitutes acceptance of our User Agreement and
            Privacy Policy and Cookie Statement and Your California Privacy
            Rights. The Techy Blinders may earn a portion of sales from
            products that are purchased through our site as part of our
            Affiliate Partnerships with retailers. The material on this site
            may not be reproduced, distributed, transmitted, cached or
            otherwise used, except with the prior written permission of The
            Techy Blinders.
            </div>
        </div>
    )
}