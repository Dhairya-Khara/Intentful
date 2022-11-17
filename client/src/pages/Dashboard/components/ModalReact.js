import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// not using any libraries for modal

function ModalReact({ setOpenModal }) {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
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
            }}>Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ModalReact;