import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const DataTable = props => {
  const columns = [
    { dataField: "classCode", text: "Code" },
    { dataField: "graduationDate", text: "Grad Date" },
    { dataField: "studentName", text: "Name" },
    { dataField: "studentEmail", text: "Email" },
    { dataField: "studentGithubUsername", text: "Github" },
    { dataField: "studentTz", text: "Student Tz" },
    { dataField: "tzDif", text: "Tz Dif" }
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
    mode: "dbclick",
    afterSaveCell: (oldValue, newValue, row, column) => {
      props.handleRowUpdate(row, props.tableName);
    }
  });

  return (
    <BootstrapTable
      striped
      bordered
      hover
      condensed
      classes="table-sm data-table"
      keyField="index"
      data={props.data}
      columns={columns}
      cellEdit={cellEdit}
    />
  );
};

export default DataTable;
