import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const DataTable = props => {
  const columns = [
    { dataField: "classCode", text: "Code", editable: false },
    { dataField: "graduationDate", text: "Grad Date", editable: false },
    { dataField: "studentName", text: "Name", editable: false },
    { dataField: "studentEmail", text: "Email", editable: false },
    { dataField: "studentGithubUsername", text: "Github", editable: false },
    { dataField: "studentTz", text: "Student Tz", editable: false },
    { dataField: "tzDif", text: "Tz Dif", editable: false }
  ];
  if (props.sessions) {
    columns.push(
      { dataField: "sessionDate", text: "Session Date" },
      { dataField: "adpTimeIn", text: "ADP In" },
      { dataField: "adpTimeOut", text: "ADP Out" },
      { dataField: "back2Back", text: "B2B?" },
      { dataField: "showNoShow", text: "Show/No?" },
      { dataField: "topicsCovered", text: "Topics" },
      { dataField: "notes", text: "Notes" },
      { dataField: "tutorsEvalFormSubmitted", text: "Eval Form" },
      { dataField: "paymentDateAmnt", text: "Payment Date Amnt" }
    );
    columns.push({
      dataField: "zoomLink",
      text: "Zoom Link",
      events: {
        onClick: e => {
          const url = e.target.textContent;
          console.log(url);
          const newTab = window.open(url, "_blank");
          newTab.focus();
        }
      }
    });
  }

  const cellEdit = cellEditFactory({
    mode: "click",
    afterSaveCell: (oldValue, newValue, row, column) => {
      props.handleRowUpdate(row, props.tableName);
    }
  });

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      props.handleStartSession(row);
    }
  };

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
      classes="table-sm data-table"
    />
  );
};

export default DataTable;
