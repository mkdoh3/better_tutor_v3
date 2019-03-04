import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

class ADPNotes extends Component {
  state = {
    copied: ""
  };
  copyToClipBoard = () => {
    const info = document.getElementById("adp-notes");
    info.select();
    document.execCommand("copy", info.value);
    window.open("https://workforcenow.adp.com/portal/theme");
  };
  render() {
    return (
      <Card style={{ width: "30vw" }}>
        <Card.Body style={{ boxShadow: "1px 1px 1px" }}>
          <Card.Title className="mb-2 text-muted">
            ADP Notes - Don't forget 'em!
          </Card.Title>
          <textarea
            value={`1. Class Code: ${this.props.code}\n 2. Student Name: ${
              this.props.name
            }\n 3. B2B: ${this.props.b2b}\n 4. No-Show: ${
              this.props.showNoShow
            }`}
            id="adp-notes"
            readOnly
            style={{ width: "100%", minHeight: "105px" }}
          />
          <Button onClick={this.copyToClipBoard}>Copy</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ADPNotes;
