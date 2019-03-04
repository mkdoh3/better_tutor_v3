import React from "react";
import { Modal, Button } from "react-bootstrap";

const SaveModal = props => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>You have unsaved changes!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleDiscardChanges}>
          Discard Changes
        </Button>
        {/* have to figure out how to make the table passed to handleSave dynamic */}
        <Button
          variant="primary"
          onClick={() => props.handleSaveChanges("sessionData")}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SaveModal;
