import React, { useState } from "react";

import Header from "./../Sitewide/Header";
import Footer from "./../Sitewide/Footer";

import LoginForm from "../Login/LoginForm.js";

export default function LoginPage() {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <div className="LoginPage page">
      <Header handleLoginClick={handleLoginClick} />
      <h1 id="loginHead">Ready to take an Intentful test drive?</h1>
      <div className="create-text centered">
        You're just two clicks away from unlocking <br></br>
        the full potential of VoiceFlow for your company.
      </div>
      <LoginForm isShowLogin={isShowLogin} />
      <Footer />
    </div>
  );
}
