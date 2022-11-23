import React from 'react'
import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'
import Bios from './Bios';


export default function About() {
  return (
    <div className="AboutPage page">
      <Header />
      <div className="create-text centered">
      You're just one step away from unlocking the full potential of VoiceFlow for your company
          </div>
      <Bios />
      <Footer />
    </div>
  );
}