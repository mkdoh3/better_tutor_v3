import React from "react";
import { Modal, Button, Form } from "react-bootstrap";


const SessionEnd = props => {
  return (
    <Modal show={props.show} onHide={props.modalToggle}>
      <Modal.Body>
        <Form.Group>
          {/*
            Consider saving strings like these labels in
            a const for later use.
          */}
          <Form.Check label="Sent Student Eval" />
          <Form.Check label="Submitted Tutor Eval" />
          <Form.Check label="Updated Sheet" />
          <Form.Check label="Clocked Out With Notes" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleEndSession()}>
          End it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SessionEnd;
