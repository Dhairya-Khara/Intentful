import React from 'react'
import axios from 'axios'

class FileUploader extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedFile: undefined,
            fileUploadStatus: ""
        }
    }

    handleUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        axios.post("http://localhost:8080/upload", data).then((res) => {
            this.setState({
                fileUploadStatus: "File " + this.state.selectedFile.name + " has been upload successfully."
            })
        });
    }

    handleFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {
        return (
            <div>
                <form className="App" onSubmit={this.handleUpload}>
                    <input type="file" name="file" onChange={this.handleFileChange} />
                    <button>Upload</button>
                </form>
                <p>{this.state.fileUploadStatus}</p>
            </div>
        )
    }
}

export default FileUploader