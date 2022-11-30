import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import File from './File'
import D3BubbleChart from './D3BubbleChart'

export default function FileSystem() {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [, setFileUploadStatus] = useState("");
  const [bubbleChart, setBubbleChart] = useState({ show: false, intents: [] });

  const visualizeData = () => {
    const url = `http://localhost:8080/getIntents`;
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(async (res) => {
        setBubbleChart({ show: true, intents: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getData = () => {
    const url = "http://localhost:8080/getTranscripts";
    let dataSoFar = [];
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(async (res) => {
        for (const index in res.data) {
          const filename = Object.keys(res.data[index])[0];
          dataSoFar.push(filename);
        }
        setFiles(dataSoFar);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedFile, selectedFile.name);
    axios
      .post("http://localhost:8080/uploadTranscript", data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(async (res) => {
        setFileUploadStatus(
          "File " + selectedFile.name + " has been upload successfully."
        );
      })
      .catch((error) => {
        alert("Not Authenticated");
      });
    setFiles((oldFiles) => [...oldFiles, selectedFile.name]);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="dashboard">
      <div className="transcript-management">
        <div className="newTranscript">
          <h2 className="filesHeader" id="tm">
            New Transcripts
          </h2>
          <form className="app" onSubmit={onSubmit}>
            <input
              id="fileUpload"
              type="file"
              name="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                document.getElementById("file-chosen").textContent =
                  e.target.files[0].name;
              }}
              hidden
            />
            <label htmlFor="fileUpload" className="newbtni file">
              Choose File
            </label>
            <span id="file-chosen" ref={ref}>
              No file chosen
            </span>
            <button className="newbtni file up">Upload</button>
          </form>
          <br></br>
          <button onClick={visualizeData} id = "newbtn" className="newbtni up">
            Visualize All Uploaded Transcripts
          </button>
        </div>
        <div className="oldTranscript">
          <h2 className="filesHeader">Uploaded Transcripts</h2>
          <div className="transcriptContainer">
            {files === undefined ? (
              <p className="inactive">No Transcripts have been uploaded</p>
            ) : (
              files.map((file) => (
                <File key={file} name={file} setBubbleChart={setBubbleChart} />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="bubbles">
        {bubbleChart.show ? (
          <D3BubbleChart intents={bubbleChart.intents} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
