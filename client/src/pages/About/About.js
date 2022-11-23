import React, {useState} from 'react'
import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'

import LoginForm from './LoginForm.js'
import LandingBody from './LandingBody'

export default function About() {
        const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <div className="LandingPage">
      <Header handleLoginClick={handleLoginClick} />
      <LoginForm isShowLogin={isShowLogin} />
      <div>

      </div>
      <div>
        
      </div>
      <Footer />
    </div>
  );
}