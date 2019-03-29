import React from "react";
import { Column } from "../utils";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

// Use single quotes in js files
// and double quotes in JSX/templates.

const DataTable = props => {
  const columns = [];
  let fields = [];
  // Split the two arrays out into their own 
  // constants with capitalcasing.
  //
  // props.sessions ? (fields = THESE_FIELDS) : (fields = THOSE_FIELDS);
  props.sessions
    ? (fields = [
        "name",
        "sessionDate",
        "studentTime",
        "localTime",
        "adpTimeIn",
        "adpTimeOut",
        "b2b",
        "showNoShow",
        "notes",
        "topics",
        "evalSubmit",
        "reoccurring"
      ])
    : (fields = [
        "classCode",
        "graduationDate",
        "name",
        "email",
        "github",
        "studentTz",
        "tzDif",
        "zoomLink"
      ]);

  fields.forEach(field => {
    const newField = new Column(field);
    columns.push(newField);
  });

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    // You could one-line stuff like this.
    // afterSaveCell: (oldValue, newValue, row, column) => props.handleRowUpdate(row, props.tableName),
    afterSaveCell: (oldValue, newValue, row, column) => {
      props.handleRowUpdate(row, props.tableName);
    }
  });


  // Move the functions in the if/else into functions, 
  // then it will be easier to read.
  //
  // if(props.sessions && props.todaysSession) {
  //   doThis();
  // } else {
  //   doThat();
  // }
  if (props.sessions && props.todaysSessions) {
    columns.unshift({
      dataField: "df2",
      isDummyField: true,
      classes: "table-btn",
      text: "start session",
      events: {
        onClick: (e, column, columnIndex, row) => {
          props.handleStartSession(row);
        }
      },
      formatter: () => {
        return <i className="far fa-play-circle fa-lg" />;
      }
    });
  } else if (props.sessions) {
    props.sessions &&
      columns.push(
        {
          dataField: "df2",
          isDummyField: true,
          text: "delete session",
          classes: "table-btn",
          events: {
            onClick: (e, column, columnIndex, row) => {
              if (
                window.confirm("Are you sure you wish to delete this item?")
              ) {
                props.handleRowDelete(row.rowId);
              }
            }
          },
          formatter: () => {
            return <i className="far fa-trash-alt fa-lg" />;
          }
        },
        {
          dataField: "rowId",
          text: "row id",
          hidden: true
        }
      );
  }

  return (
    <BootstrapTable
      hover
      striped
      bordered
      condensed
      keyField="rowId"
      data={props.data}
      columns={columns}
      cellEdit={cellEdit}
      headerClasses="header-class"
      classes="table-sm data-table"
    />
  );
};

export default DataTable;
