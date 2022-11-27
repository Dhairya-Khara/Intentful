import React from 'react'
import { useSelector } from 'react-redux'
// import FileUploader from './components/FileUploader'
// import LogOut from './components/Logout'
// // import BubbleChart from './components/BubbleChart'
// import D3BubbleChart from './components/D3BubbleChart'

import LogoutHeader from './components/LogoutHeader'
// import BubbleChart from './components/BubbleChart'
import FileSystem from './components/FileSystem'
import Footer from './../Sitewide/Footer'

export default function Dashboard() {
    const auth = useSelector((state) => state.auth.authenticated)
    if (auth) {
        return (
            <div className='Dashboard page'>
                <LogoutHeader />
                <FileSystem />
                <Footer></Footer>
            </div>
        )
    }
    else {
        return (
            <div>
                <h3>403 - Not Authenticated</h3>
            </div>)
    }
}
