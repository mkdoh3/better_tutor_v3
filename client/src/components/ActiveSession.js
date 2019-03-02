import React from "react";
import { Card } from "react-bootstrap";
import StudentInfo from "./StudentInfo";
import SurveyLink from "./SurveyLink";
import ADPNotes from "./ADPNotes";
import Countdown from "./Countdown";
import TutorForm from "./TutorForm";

const ActiveSession = props => {
  const {
    classCode,
    studentName,
    studentEmail,
    studentGithubUsername,
    zoomLink,
    prevNotes
  } = props.studentData;
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
      <TutorForm
        code={classCode}
        name={studentName}
        email={studentEmail}
        github={studentGithubUsername}
      />
    </>
  );
};
export default ActiveSession;
