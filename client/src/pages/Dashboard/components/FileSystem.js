import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import File from "./File";
import BubbleChart from "./BubbleChart";
import D3BubbleChart from "./D3BubbleChart";

export default function FileSystem() {
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [fileUploadStatus, setFileUploadStatus] = useState("");
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
  }, []);

  return (
    <div className="dashboard">
      <div className="transcript-management">
        <h2  id="tm">Transcript Management</h2>
        <form className="app" onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button>Upload</button>
        </form>
        <br></br>
        <button onClick={visualizeData}>Visualize All</button>

        <h2>Uploaded Transcripts</h2>
          {files === undefined ? (
            <p className="inactive">No Transcripts have been uploaded</p>
          ) : (
            files.map((file) => (
              <File key={file} name={file} setBubbleChart={setBubbleChart} />
            ))
          )}
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
