import React from "react";
import { Card } from "react-bootstrap";

const StudentInfo = props => {
  return (
    <Card style={{ width: "30vw" }}>
      <Card.Body className="info-card">
        <Card.Title className="mb-2 text-muted">
          Previous Session Notes:
        </Card.Title>
        <Card.Text>{props.notes}</Card.Text>
        <Card.Title className="mb-2 text-muted">Topics to cover:</Card.Title>
        <Card.Text>{props.topics}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentInfo;
