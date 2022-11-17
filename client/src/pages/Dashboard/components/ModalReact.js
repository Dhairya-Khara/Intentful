import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// not using any libraries for modal

function ModalReact({ setOpenModal, intentName }) {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Intent: {intentName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
              setOpenModal(false);
            }}>Close</Button>
        <Button variant="primary" onClick={() => {
              // DIRECT US TO VOICEFLOW HERE
              // use {intentName}
            }}>Add Intent to Voiceflow</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ModalReact;