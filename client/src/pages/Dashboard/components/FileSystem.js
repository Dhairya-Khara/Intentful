import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import File from './File'
import BubbleChart from './BubbleChart'

export default function FileSystem() {


    const [files, setFiles] = useState([])
    const token = useSelector((state) => state.auth.token)
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [fileUploadStatus, setFileUploadStatus] = useState('')
    const [bubbleChart, setBubbleChart] = useState({ show: false, intents: [] })

    const getData = () => {
        const url = "http://localhost:8080/getTranscripts"
        let dataSoFar = []
        axios.get(url, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            for (const index in res.data) {
                const filename = Object.keys(res.data[index])[0]
                dataSoFar.push(filename)
            }
            setFiles(dataSoFar)
        }).catch((error) => {
            alert(error)
        })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile, selectedFile.name)
        axios.post("http://localhost:8080/uploadTranscript", data, { headers: { "Authorization": "Bearer " + token } }).then(async (res) => {
            setFileUploadStatus("File " + selectedFile.name + " has been upload successfully.")
        }).catch((error) => {
            alert("Not Authenticated")
        })
        setFiles(oldFiles => [...oldFiles, selectedFile.name])
    }


    useEffect(() => {
        getData()
    }, [])



    return (
        <div>
            <form className="App" onSubmit={onSubmit}>
                <input type="file" name="file" onChange={e => setSelectedFile(e.target.files[0])} />
                <button>Upload</button>
            </form>
            <br></br>
            <button>Visualize All</button>

            <h2>Transcripts</h2>
            {files === undefined ? <p>No Transcripts have been uploaded</p> : files.map((file) => <File key={file} name={file} setBubbleChart={setBubbleChart} />)}
            {bubbleChart.show ? <BubbleChart intents = {bubbleChart.intents}/> : <div></div>}
        </div>
    )
}