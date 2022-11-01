import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import File from './File'


export default function FileViewer() {
    const [files, setFiles] = useState(["a.json", "b.json", "c.json"])
    const token = useSelector((state) => state.auth.token)

    useEffect(() => {
        async function getData() {
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
        getData()
    }, [])

    return (
        <div>
            <h2>Transcripts</h2>
            {files.map((file) => <File key={file} name={file} />)}
        </div>
    )
}

