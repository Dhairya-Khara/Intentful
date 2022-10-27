import React, { useState } from 'react'
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
                <input type="file" name="file" onChange= {e => setSelectedFile(e.target.files[0])} />
                <button>Upload</button>
            </form>
            {/* {fileUploadStatus === "" ? "" : <Boxes />} */}
        </div>
    )

}

// class FileUploader extends React.Component {

//     constructor() {
//         super()
//         this.state = {
//             selectedFile: undefined,
//             fileUploadStatus: ""
//         }
//     }

//     handleUpload = (event) => {
//         event.preventDefault();
//         const data = new FormData();
//         data.append('file', this.state.selectedFile, this.state.selectedFile.name);
//         axios.post("http://localhost:8080/upload", data).then((res) => {
//             this.setState({
//                 fileUploadStatus: "File " + this.state.selectedFile.name + " has been upload successfully."
//             })
//         });
//     }

//     handleFileChange = (event) => {
//         this.setState({
//             selectedFile: event.target.files[0]
//         })
//     }


//     render() {
//         return (
//             <div>
                // <form className="App" onSubmit={this.handleUpload}>
                //     <input type="file" name="file" onChange={this.handleFileChange} />
                //     <button>Upload</button>
                // </form>
                // {this.state.fileUploadStatus === "" ? "" : <Boxes />}
//             </div>
//         )
//     }
// }

// export default FileUploader

