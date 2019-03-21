// const moment = require("moment");

// function checkIfTomorrow(date) {
//   const tomorrowsDate = moment()
//     .add(1, "day")
//     .format("YYYY-MM-DD");

//   return moment(date).format("YYYY-MM-DD") === tomorrowsDate;
// }

// console.log(checkIfTomorrow("2019-03-01"));

// function nextWeek(date) {
//   return moment(date)
//     .add(7, "days")
//     .format("YYYY-MM-DD");
// }

// nextWeek("2019-03-01"); //?

// const testObj = {
//   test1(str) {
//     console.log(str);
//   },
//   test2() {
//     test = () => {
//       this.test1("hi");
//     };
//     return true;
//   }
// };

// testObj.test2(); //?
// handleAddSession = eventKey => {
//   const table = eventKey ? "sessionData" : "rosterData";
//   const data = [...this.state[table]];
//   const rowData = eventKey
//     ? filter.findStudent(eventKey, this.state.rosterData)
//     : { ...this.state.rosterData[0] };
//   const updated = [...this.state.updated];
//   const newIndex = data.length;
//   table === "sessionData"
//     ? obj.mergeObjects(data[0], rowData)
//     : obj.placeholderObj(rowData);
//   rowData.index = newIndex;
//   rowData.newRow = true;
//   data.push(rowData);
//   updated.push(newIndex);
//   this.setState({ [table]: data, updated });
// };

// import React from "react";
// import BootstrapTable from "react-bootstrap-table-next";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
// import { Column } from "../utils";
// const DataTable = props => {
//   // I might want to rewrite this to use a new dataFilter function and a constructor to build the columns
//   const columns = [];
//   let fields = [];
//   if (props.sessions) {
//     fields = [
//       "studentName",
//       "sessionDate",
//       "studentSessionTime",
//       "localTime",
//       "adpTimeIn",
//       "adpTimeOut",
//       "back2Back",
//       "showNoShow",
//       "showNoShow",
//       "notes",
//       "tutorsEvalFormSubmitted",
//       "zoomLink"
//     ];
//   } else {
//     fields = [
//       "classCode",
//       "graduationDate",
//       "studentName",
//       "studentEmail",
//       "studentGithubUsername",
//       "studentTz",
//       "tzDif",
//       "zoomLink"
//     ];
//   }
//   fields.forEach(field => {
//     const newField = new Column(field);
//     columns.push(newField);
//   });

//   const cellEdit = cellEditFactory({
//     mode: "click",
//     blurToSave: true,
//     afterSaveCell: (oldValue, newValue, row, column) => {
//       props.handleRowUpdate(row, props.tableName);
//     }
//   });

//   const rowEvents = props.handleStartSession
//     ? {
//         onDoubleClick: (e, row, rowIndex) => {
//           props.handleStartSession(row);
//         }
//       }
//     : null;

//   return (
//     <BootstrapTable
//       hover
//       striped
//       bordered
//       condensed
//       keyField="index"
//       data={props.data}
//       columns={columns}
//       cellEdit={cellEdit}
//       rowEvents={rowEvents}
//       headerClasses="header-class"
//       classes="table-sm data-table"
//     />
//   );
// };

// export default DataTable;

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
// columns = [
//   { ...ec, dataField: "studentName", text: "Name" },
//   { ...ec, dataField: "sessionDate", text: "Session Date", sort: true },
//   { ...ec, dataField: "studentSessionTime", text: "Student Time" },
//   { ...ec, dataField: "localTime", text: "Local Time", sort: true },
//   {
//     ...ec,
//     dataField: "adpTimeIn",
//     text: "ADP In"
//   },
//   { ...ec, dataField: "adpTimeOut", text: "ADP Out" },
//   {
//     ...ec,
//     dataField: "back2Back",
//     text: "B2B?"
//   },
//   {
//     ...ec,
//     dataField: "showNoShow",
//     text: "Show/No?"
//   },
//   { ...ec, dataField: "topicsCovered", text: "Topics" },
//   { ...ec, dataField: "notes", text: "Notes" },
//   { ...ec, dataField: "tutorsEvalFormSubmitted", text: "Eval Form" },
//   { ...ec, dataField: "zoomLink", text: "Zoom Link" }
// ];

// MB: Save things like formatting and other strings
// in a /types directory.
//
// const DateFormats = Object.freeze({
//   YYYYMMDD: 'YYYY-MM-DD',
// });

let a = argv[2];
let b = argv[3];
let c = argv[4];

console.log(a);
