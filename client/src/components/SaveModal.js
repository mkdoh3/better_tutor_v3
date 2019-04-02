import React from "react";
import { Modal, Button } from "react-bootstrap";

// You are using Bootstrap button,
// but also have a button component
// that uses Bootstrap. Which one is
// the one to use?
const SaveModal = props => {
  return (
    <Modal show={props.show} onHide={props.modalToggle}>
      <Modal.Body>You have unsaved changes!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleDiscardChanges}>
          Discard Changes
        </Button>
        <Button
          variant="primary"
          onClick={() => props.handleSaveChanges(props.table)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveModal;
