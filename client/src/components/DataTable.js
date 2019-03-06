import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Column } from "../utils";
const DataTable = props => {
  const columns = [];
  let fields = [];
  if (props.sessions) {
    fields = [
      "name",
      "sessionDate",
      "studentTime",
      "localTime",
      "adpTimeIn",
      "adpTimeOut",
      "b2b",
      "showNoShow",
      "notes",
      "evalSubmit",
      "zoomLink"
    ];
  } else {
    fields = [
      "classCode",
      "graduationDate",
      "name",
      "studentEmail",
      "studentGithubUsername",
      "studentTz",
      "tzDif",
      "zoomLink"
    ];
  }
  fields.forEach(field => {
    const newField = new Column(field);
    columns.push(newField);
  });

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
      pagination={paginationFactory()}
    />
  );
};

export default DataTable;
