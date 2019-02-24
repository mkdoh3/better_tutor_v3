import React from "react";
import StudentInfo from "./StudentInfo";
import SurveyLink from "./SurveyLink";
import ADPNotes from "./ADPNotes";

const ActiveSession = props => {
  const { studentName, zoomLink, prevNotes } = props.studentData;
  return (
    <>
      <StudentInfo name={studentName} link={zoomLink} notes={prevNotes} />
      <SurveyLink />
      <ADPNotes />
    </>
  );
};
export default ActiveSession;
