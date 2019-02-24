import React from "react";

//display name, zoomLink, notes from last session, what topics they want to cover maybe..

const StudentInfo = props => {
  return (
    <>
      <h3>Name: {props.name}</h3>
      <a href={props.link} rel="noopener noreferrer" target="_blank">
        <h4>Launch Zoom</h4>
      </a>
      <p>Previous Session notes: {props.notes}</p>
    </>
  );
};

export default StudentInfo;
