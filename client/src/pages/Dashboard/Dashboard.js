import React from 'react'
import FileUploader from './components/FileUploader'
import Boxes from './components/Boxes'

class Dashbaord extends React.Component {
    render() {
        return (
            <div>
                <h1>Intentful</h1>
                <h3>By the order of Techy Blinders</h3>
                <FileUploader />
                <Boxes />
            </div>
        )
    }
}

export default Dashbaord