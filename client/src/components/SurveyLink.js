import React from "react";
import { Card } from "react-bootstrap";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

const ADPNotes = props => {
  return (
    <Card style={{ width: "30vw" }}>
      <Card.Body style={{ boxShadow: "1px 1px 1px" }}>
        <Card.Title className="mb-2 text-muted">Slack These!</Card.Title>
        <ul>
          <li>{props.code}</li>
          <li>
            <Card.Link href="https://docs.google.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform">
              Student Survey
            </Card.Link>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default ADPNotes;
