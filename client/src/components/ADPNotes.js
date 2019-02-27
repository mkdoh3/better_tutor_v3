import React, { Component } from "react";
import { Card } from "react-bootstrap";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

class ADPNotes extends Component {
  state = {
    b2b: "no",
    noShow: "no"
  };

  render() {
    return (
      <Card style={{ width: "30vw" }}>
        <Card.Body style={{ boxShadow: "1px 1px 1px" }}>
          <Card.Title className="mb-2 text-muted">
            ADP Notes - Don't forget 'em!
          </Card.Title>
          <Card.Text>
            <ol>
              <li>Class Code:{this.props.code}</li>
              <li>Student Name: {this.props.name}</li>
              <li>B2B: {this.state.b2b}</li>
              <li>No-Show: {this.state.noShow}</li>
            </ol>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ADPNotes;
