import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import LandingPage from './pages/LandingPage/LandingPage'

class AppRouter extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Routes>
            <Route path = "/" element = {<LandingPage />} exact = {true} />
            <Route path = "/dashboard" element = {<Dashboard />} exact = {true} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter