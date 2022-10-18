import React from 'react'
import { useSelector } from 'react-redux'

import FileUploader from './components/FileUploader'
import Boxes from './components/Boxes'


export default function Dashboard() {
    const auth = useSelector((state) => state.auth.authenticated)
    if(auth){
        return (
            <div>
                <h1>Intentful</h1>
                <h3>By the order of Techy Blinders</h3>
                <FileUploader />
                <Boxes />
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