import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// not using any libraries for modal

import addBlock from "./utils/makeBlockOnVoiceflow";

function ModalReact({ setOpenModal, intentName, intentFrequency, intentAssociates }) {
  return (
    <Modal.Dialog size="xl">
      <Modal.Header>
        <Modal.Title>Intent: {intentName}, Frequency: {intentFrequency}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Intent Associates: {intentAssociates}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setOpenModal(false);
        }}>Close</Button>
        <Button variant="primary" onClick={() => {
          // DIRECT US TO VOICEFLOW HERE
          // use {intentName}
          console.log('click')
          addBlock('63728e4cdbfce712134dded9', 'kharadhairya2@gmail.com', '1J7w@r@A*k86', intentName)
          alert('Block has been created with intent ' + intentName)
        }}>Add Intent to Voiceflow</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ModalReact;
