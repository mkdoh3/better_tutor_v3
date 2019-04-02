import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

class ADPNotes extends Component {
  // What changes this state?
  state = {
    copied: ""
  };
  copyToClipBoard = () => {
    const info = document.getElementById("student-eval");
    info.select();
    document.execCommand("copy", info.value);
  };
  render() {
    // this should be saved in a const for URLs.
    const studentEval = "http://bit.ly/students-eval";
    return (
      <Card style={{ width: "30vw" }}>
        <Card.Body className="info-card">
          <Card.Title className="mb-2 text-muted">Slack These!</Card.Title>
          <textarea
            value={`${studentEval} \n ${this.props.code}`}
            id="student-eval"
            readOnly
          />
          <Button onClick={this.copyToClipBoard}>Copy</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ADPNotes;
