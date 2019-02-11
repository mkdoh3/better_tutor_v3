import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const DataTable = props => {
  const columns = [
    { dataField: "classcode", text: "Code" },
    { dataField: "graduationdate", text: "Grad Date" },
    { dataField: "studentname", text: "Name" },
    { dataField: "studentemail", text: "Email" },
    { dataField: "studentgithubusername", text: "Github" },
    { dataField: "studenttz", text: "Student Tz" },
    { dataField: "tzdif", text: "Tz Dif" }
  ];

  if (props.sessions) {
    columns.push(
      { dataField: "sessiondate", text: "Session Date" },
      { dataField: "adptimein", text: "ADP In" },
      { dataField: "adptimeout", text: "ADP Out" },
      { dataField: "back2back", text: "B2B?" },
      { dataField: "shownoshow", text: "Show/No?" },
      { dataField: "topicscovered", text: "Topics" },
      { dataField: "notes", text: "Notes" },
      { dataField: "tutorsevalformsubmitted", text: "Eval Form" },
      { dataField: "paymentdateamnt", text: "Payment Date Amnt" }
    );

    columns.push({
      dataField: "zoomlink",
      text: "Zoom Link",
      events: {
        onClick: e => {
          const url = e.target.textContent;
          const newTab = window.open(url, "_blank");

          newTab.focus();
        },
      },
    });
  }
  const cellEdit = cellEditFactory({
    mode: "dbclick",

    afterSaveCell: (oldValue, newValue, row, column) => {
      props.handleRowUpdate(row);
    },
  });

  return (
    <BootstrapTable
      striped
      bordered
      hover
      condensed
      classes="table-sm data-table"
      keyField="index"
      data={ props.data }
      columns={ columns }
      cellEdit={ cellEdit }
    />
  );
};

export default DataTable;
