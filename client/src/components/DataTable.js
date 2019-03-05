import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

const DataTable = props => {
  // I might want to rewrite this to use a new dataFilter function and a constructor to build the columns
  let columns = [];
  const ec = { editorClassName: () => "editing-cell" };
  if (props.sessions) {
    columns = [
      { ...ec, dataField: "studentName", text: "Name" },
      { ...ec, dataField: "sessionDate", text: "Session Date", sort: true },
      { ...ec, dataField: "studentSessionTime", text: "Student Time" },
      { ...ec, dataField: "localTime", text: "Local Time", sort: true },
      {
        ...ec,
        dataField: "adpTimeIn",
        text: "ADP In"
      },
      { ...ec, dataField: "adpTimeOut", text: "ADP Out" },
      {
        ...ec,
        dataField: "back2Back",
        text: "B2B?"
      },
      {
        ...ec,
        dataField: "showNoShow",
        text: "Show/No?"
      },
      { ...ec, dataField: "topicsCovered", text: "Topics" },
      { ...ec, dataField: "notes", text: "Notes" },
      { ...ec, dataField: "tutorsEvalFormSubmitted", text: "Eval Form" },
      { ...ec, dataField: "zoomLink", text: "Zoom Link" }
    ];
  } else {
    columns = [
      { ...ec, dataField: "classCode", text: "Code" },
      { ...ec, dataField: "graduationDate", text: "Grad Date" },
      { ...ec, dataField: "studentName", text: "Name" },
      { ...ec, dataField: "studentEmail", text: "Email" },
      { ...ec, dataField: "studentGithubUsername", text: "Github" },
      { ...ec, dataField: "studentTz", text: "Student Tz" },
      { ...ec, dataField: "tzDif", text: "Tz Dif" },
      { ...ec, dataField: "zoomLink", text: "Zoom Link" }
    ];
  }
  const cellEdit = cellEditFactory({
    mode: "click",
    blurToSave: true,
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

// editor: {
//   type: Type.SELECT,
//   options: [
//     {
//       value: "N",
//       label: "No"
//     },
//     {
//       value: "Y",
//       label: "Yes"
//     }
//   ]
// }

// editor: {
//   type: Type.SELECT,
//   options: [
//     {
//       value: "Show",
//       label: "Show"
//     },
//     {
//       value: "No Show",
//       label: "No show"
//     }
//   ]
// }
