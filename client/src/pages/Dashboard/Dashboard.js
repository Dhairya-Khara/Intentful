import React from 'react'
import { useSelector } from 'react-redux'
import LogoutHeader from './components/LogoutHeader'
import FileSystem from './components/FileSystem'

export default function Dashboard() {
    const auth = useSelector((state) => state.auth.authenticated)
    if (auth) {
        return (
            <div className='Dashboard page'>
                <LogoutHeader />
                <FileSystem />
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
