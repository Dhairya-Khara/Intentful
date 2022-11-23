import React, {useState} from 'react'
import Header from './../Sitewide/Header'
import Footer from './../Sitewide/Footer'
import LandingBody from './LandingBody'

export default function LandingPage() {
    return (
    <div>
      <Header />
      <LandingBody />
      <Footer />
    </div>
  );
}