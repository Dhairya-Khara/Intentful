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
  <h1>Ready to take a free trial?</h1>
        <div className="create-text centered">
          You're just one click away from unlocking the full potential <br></br>
          of VoiceFlow for your company.
        </div>
  <LoginForm isShowLogin={isShowLogin} />
  <Footer />
</div>
);
}