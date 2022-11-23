import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/Login/LoginPage'
import About from './pages/About/About'


class AppRouter extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Routes>
            <Route path = "/" element = {<LandingPage />} exact = {true} />
            <Route path = "/landingpage" element = {<LandingPage />} exact = {true} />
            <Route path = "/dashboard" element = {<Dashboard />} exact = {true} />
            <Route path = "/login" element = {<LoginPage />} exact = {true} />
            <Route path = "/about" element = {<About />} exact = {true} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter