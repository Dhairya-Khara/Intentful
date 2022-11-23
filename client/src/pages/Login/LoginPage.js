import React, {useState} from 'react'

import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'

import LoginForm from '../Login/LoginForm.js'

export default function LoginPage() {
    const [isShowLogin, setIsShowLogin] = useState(true);

const handleLoginClick = () => {
setIsShowLogin((isShowLogin) => !isShowLogin);
};

return (
<div className="LoginPage page">
  <Header handleLoginClick={handleLoginClick} />
  <LoginForm isShowLogin={isShowLogin} />
  <Footer />
</div>
);
}