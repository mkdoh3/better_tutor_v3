import React from "react";
import { Card } from "react-bootstrap";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

const StudentInfo = props => {
  return (
    <Card style={{ width: "30vw" }}>
      <Card.Body className="info-card">
        <Card.Title className="mb-2 text-muted">
          Previous Session Notes:
        </Card.Title>
        <Card.Text>{props.notes}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentInfo;
