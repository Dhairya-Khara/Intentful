<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import Header from "./../Sitewide/Header";
import Footer from "./../Sitewide/Footer";
import Bios from "./Bios";
=======
import React from 'react'
import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'
import Bios from './Bios';

>>>>>>> 5a82e2f (Finalized UI)

export default function About() {
  return (
    <div className="AboutPage page">
      <Header />
<<<<<<< HEAD
=======
      <div className="create-text centered">
      You're just one step away from unlocking the full potential of VoiceFlow for your company
          </div>
>>>>>>> 5a82e2f (Finalized UI)
      <Bios />
      <Footer />
    </div>
  );
}
=======
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
>>>>>>> 6070123 (Finalized UI)
