import React from 'react'
import { useSelector } from 'react-redux'
import FileUploader from './components/FileUploader'
import LogOut from './components/Logout'
// import BubbleChart from './components/BubbleChart'
import D3BubbleChart from './components/D3BubbleChart'

export default function Dashboard() {
    const auth = useSelector((state) => state.auth.authenticated)
    if(auth){
        return (
            <div>
                <LogOut />
                <h1>Intentful</h1>
                <center>
                <h2>By order of the Techy Blinders</h2>
                <FileUploader />
                </center>
                <D3BubbleChart />
            </div>
        )
    }
    else{
        return(
        <div>
            <h3>403 - Not Authenticated</h3>
        </div>)
    }
}