import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// not using any libraries for modal

import addBlock from "./utils/makeBlockOnVoiceflow";

function formatIntent(intent) {
  var formattedIntentName = intent.replace("_", " ") + '"';
  formattedIntentName =
    formattedIntentName[0].toUpperCase() + formattedIntentName.slice(1);
  formattedIntentName = ' "' + formattedIntentName;
  return formattedIntentName;
}

function formatAssociates(intentAssociates, intentName) {
  const associates = intentAssociates.split(",");
  const formattedIntentName = formatIntent(intentName);
  const formattedAssociates = [];
  var currAssociate = formattedIntentName + " was followed by";
  if (intentAssociates.length <= 1 || intentAssociates === "None") {
    return currAssociate + " no other intents.";
  }
  else if (associates.length === 2) {
    return currAssociate + " " + formatIntent(associates[0]) + " " + associates[1] + " times.";
  } else {
    currAssociate += ": "
    for (let i = 0; i < associates.length; i++) {
      if (i % 2 === 0) {
        currAssociate += formatIntent(associates[i]);
      } else {
        if (i !== associates.length - 1) {
          currAssociate += " " + associates[i] + " times,";
        } else {
          currAssociate += " " + associates[i] + " times.";
        }
        formattedAssociates.push(currAssociate);
        currAssociate = "";
      }
    }
    return formattedAssociates;
  }
}

function ModalReact({
  setOpenModal,
  intentName,
  intentFrequency,
  intentAssociates,
  opacity
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentID, setDocumentID] = useState("");
  const formatted = formatAssociates(intentAssociates, intentName);
  const opacityValue = opacity ? 1 : 0;
  return (
    <Modal.Dialog size="xl" className="ModalModal" id="ModalModal" style={{opacity: opacityValue}}>
      <Modal.Header />
      {intentFrequency === 1 ? <p> Intent '{intentName}' appeared {intentFrequency} time.</p> :
      <p> Intent '{intentName}' appeared {intentFrequency} times.</p>}

      <p>Intent Associates: {formatted}</p>
      <Modal.Body className="ModalBoxes">
        <div className="input">
          <input
            type="text"
            id="vf-email-input"
            className="input-text dash"
            placeholder="VoiceFlow Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="vf-email-input" className="input-label dash">
            VoiceFlow Email
          </label>
        </div>
        <div className="input">
          <input
            type="password"
            id="vf-password-input"
            className="input-text dash"
            placeholder="VoiceFlow Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="vf-password-input" className="input-label dash">
            VoiceFlow Password
          </label>
        </div>
        <div className="input">
          <input
            type="text"
            id="vf-docid-input"
            className="input-text dash"
            placeholder="VoiceFlow Document ID"
            value={documentID}
            onChange={(e) => setDocumentID(e.target.value)}
          />
          <label htmlFor="vf-docid-input" className="input-label dash">
            VoiceFlow Document ID
          </label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          className="newbtni file up"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          className="newbtni file up"
          onClick={() => {
            addBlock(documentID, email, password, intentName);
            alert("Block has been created with intent " + intentName);
          }}
        >
          Add Intent to Voiceflow
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ModalReact;
