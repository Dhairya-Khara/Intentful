import React from "react";
import Header from "./../Sitewide/Header";
import Footer from "./../Sitewide/Footer";
import Bios from "./Bios";

export default function About() {
  return (
    <div className="AboutPage page">
      <Header />
      <Bios />
      <Footer />
    </div>
  );
}
