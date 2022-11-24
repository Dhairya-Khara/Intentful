import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// not using any libraries for modal

import addBlock from "./utils/makeBlockOnVoiceflow";

function ModalReact({ setOpenModal, intentName, intentFrequency, intentAssociates }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [documentID, setDocumentID] = useState('')
  return (
    <Modal.Dialog size="xl">
      <Modal.Header />

      <Modal.Body>
        <p>Intent Associates: {intentAssociates}</p>
        <input type = "text" placeholder="Voiceflow Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
        <input type = "password" placeholder = "Voiceflow Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
        <input type = "text" placeholder = "Voiceflow Document Id" value = {documentID} onChange = {e => setDocumentID(e.target.value)}/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setOpenModal(false);
        }}>Close</Button>
        <Button variant="primary" onClick={() => {
          addBlock(documentID, email, password, intentName)
          alert('Block has been created with intent ' + intentName)
        }}>Add Intent to Voiceflow</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ModalReact;