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
    name,
    email,
    github,
    zoomLink,
    prevNotes,
    b2b,
    showNoShow
  } = props.studentData;
  return (
    <div className="container-flex" style={{ margin: "1.5rem auto" }}>
      <Countdown />
      <Card style={{ width: "95vw", margin: "0 auto" }}>
        <Card.Body className="cards-wrapper">
          <Card.Title
            className="mb-2 text-muted"
            style={{ textAlign: "center", padding: "10px" }}
          >
            Session Details - <span style={{ fontWeight: "bold" }}>{name}</span>{" "}
            - <Card.Link href={zoomLink}>Launch Zoom</Card.Link>
          </Card.Title>
          <div
            className="card-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <StudentInfo name={name} link={zoomLink} notes={prevNotes} />
            <ADPNotes
              code={classCode}
              name={name}
              b2b={b2b}
              showNoShow={showNoShow}
            />
            <SurveyLink code={classCode} />
          </div>
        </Card.Body>
      </Card>
      <TutorForm code={classCode} name={name} email={email} github={github} />
    </div>
  );
};
export default ActiveSession;
