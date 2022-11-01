import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
<<<<<<< HEAD
import D3BubbleChart from './D3BubbleChart'
=======

>>>>>>> 1ebd7544520c6847dc40e6bf2eecfa27e874db5e

export default function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [fileUploadStatus, setFileUploadStatus] = useState('')

    const token = useSelector((state) => state.auth.token)

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile, selectedFile.name)
        axios.post("http://localhost:8080/uploadTranscript", data, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            setFileUploadStatus("File " + selectedFile.name + " has been upload successfully.")
        }).catch((error) => {
            alert("Not Authenticated")
        })
    }

    return (
        <div>
            <form className="App" onSubmit={onSubmit}>
                <input type="file" name="file" onChange= {e => setSelectedFile(e.target.files[0])} />
                <button>Upload</button>
            </form>
            {fileUploadStatus === "" ? "" : <D3BubbleChart />}
        </div>
    )

}