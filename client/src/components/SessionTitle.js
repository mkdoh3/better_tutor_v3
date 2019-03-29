import React from "react";
import { Card } from "react-bootstrap";

const SessionTitle = props => {
  return (
    // <Card.Title> is your wrapping component. Is <> needed here?
    // Why use inline styles here?
    // The <Card.Link href should be saved in something like a URLs const.
    <>
      <Card.Title
        className="mb-2 text-muted"
        style={{ textAlign: "center", padding: "10px" }}
      >
        <span style={{ fontWeight: "bold" }}>{props.name} - </span>
        <Card.Link href={props.link} target="_blank">
          Launch Zoom
        </Card.Link>
        <span style={{ fontWeight: "bold" }}> - </span>
        <Card.Link
          href={"https://workforcenow.adp.com/workforcenow/login.html"}
          target="_blank"
        >
          Launch APD
        </Card.Link>
      </Card.Title>
    </>
  );
};

export default SessionTitle;
