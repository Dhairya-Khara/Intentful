import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


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
                <input type="file" name="file" onChange={e => setSelectedFile(e.target.files[0])} />
                <button>Upload</button>
            </form>
        </div>
    )

}






