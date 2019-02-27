import React from "react";
import { Card } from "react-bootstrap";
import StudentInfo from "./StudentInfo";
import SurveyLink from "./SurveyLink";
import ADPNotes from "./ADPNotes";
import Countdown from "./Countdown";

const ActiveSession = props => {
  const { studentName, zoomLink, prevNotes, classCode } = props.studentData;
  return (
    <>
      <Countdown />
      <Card style={{ width: "95vw", margin: "0 auto" }}>
        <Card.Body style={{ boxShadow: "1px 1px 1px" }}>
          <Card.Title
            className="mb-2 text-muted"
            style={{ textAlign: "center", padding: "10px" }}
          >
            Session Details -{" "}
            <span style={{ fontWeight: "bold" }}>{studentName}</span> -{" "}
            <Card.Link href={zoomLink}>Launch Zoom</Card.Link>
          </Card.Title>
          <div
            className="card-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <StudentInfo name={studentName} link={zoomLink} notes={prevNotes} />
            <ADPNotes code={classCode} name={studentName} />
            <SurveyLink code={classCode} />
          </div>
        </Card.Body>
      </Card>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform"
        frameborder="0"
        style={{ width: "50vw", margin: "0 auto" }}
      />
    </>
  );
};
export default ActiveSession;
