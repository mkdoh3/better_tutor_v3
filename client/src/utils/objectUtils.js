import decamelize from "decamelize";
import uniqid from "uniqid";

const objUtils = {
  placeholderObj(obj) {
    for (let key in obj) {
      obj[key] = key;
    }
    return obj;
  },

  mergeObjects(obj1, obj2) {
    for (let key in obj1) {
      if (!obj2.hasOwnProperty(key)) {
        obj2[key] = "";
      }
    }
  },

  buildSessionRow(template, rowData) {
    this.mergeObjects(template, rowData);
    rowData.rowId = uniqid();
    rowData.showNoShow = "Show";
    rowData.b2b = "N";
    rowData.newRow = true;
    return rowData;
  }
};

/// does it make sense to have this in objectUtils?
export const Column = function(field, show) {
  //still need to actually use this classname in css to change editing textarea style
  if (field === "sessionDate" || field === "studentTime") {
    this.sort = true;
  }
  this.editorClassName = () => "editing-cell";
  this.dataField = field;
  this.text = decamelize(field, " ");
};

export default objUtils;
