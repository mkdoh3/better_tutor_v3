import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const DataTable = props => {
  //there are some repeated line between the two here, was thinking of setting columns to have the two common fields
  //by default.. but then the order in which their displayed would get all screwed up - didn't seem worth all of the
  //extra code to fix it. Anyway.. this is where data displayed can be adjusted as wanted - everything from sheets is passed as
  //props and available here.
  let columns = [];
  if (props.sessions) {
    columns = [
      { dataField: "studentName", text: "Name" },
      { dataField: "sessionDate", text: "Session Date", sort: true },
      { dataField: "studentSessionTime", text: "Student Time" },
      { dataField: "localTime", text: "Local Time", sort: true },
      { dataField: "adpTimeIn", text: "ADP In" },
      { dataField: "adpTimeOut", text: "ADP Out" },
      { dataField: "back2Back", text: "B2B?" },
      { dataField: "showNoShow", text: "Show/No?" },
      { dataField: "topicsCovered", text: "Topics" },
      { dataField: "notes", text: "Notes" },
      { dataField: "tutorsEvalFormSubmitted", text: "Eval Form" },
      { dataField: "zoomLink", text: "Zoom Link" }
    ];
  } else {
    columns = [
      { dataField: "classCode", text: "Code" },
      { dataField: "graduationDate", text: "Grad Date" },
      { dataField: "studentName", text: "Name" },
      { dataField: "studentEmail", text: "Email" },
      { dataField: "studentGithubUsername", text: "Github" },
      { dataField: "studentTz", text: "Student Tz" },
      { dataField: "tzDif", text: "Tz Dif" },
      { dataField: "zoomLink", text: "Zoom Link" }
    ];
  }
  const cellEdit = cellEditFactory({
    mode: "click",
    afterSaveCell: (oldValue, newValue, row, column) => {
      props.handleRowUpdate(row, props.tableName);
    }
  });

  const rowEvents = props.handleStartSession
    ? {
        onDoubleClick: (e, row, rowIndex) => {
          props.handleStartSession(row);
        }
      }
    : null;

  return (
    <BootstrapTable
      hover
      striped
      bordered
      condensed
      keyField="index"
      data={props.data}
      columns={columns}
      cellEdit={cellEdit}
      rowEvents={rowEvents}
      headerClasses="header-class"
      classes="table-sm data-table"
    />
  );
};

export default DataTable;
