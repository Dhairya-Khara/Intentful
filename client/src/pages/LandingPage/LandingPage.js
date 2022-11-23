import React, {useState} from 'react'
import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'
<<<<<<< HEAD
import LandingBody from './LandingBody'

export default function LandingPage() {
    return (
    <div>
      <Header />
=======

import LoginForm from './LoginForm.js'
import LandingBody from './LandingBody'

export default function LandingPage() {
        const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <div className="LandingPage">
      <Header handleLoginClick={handleLoginClick} />
      <LoginForm isShowLogin={isShowLogin} />
>>>>>>> 6070123 (Finalized UI)
      <LandingBody />
      <Footer />
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6070123 (Finalized UI)
