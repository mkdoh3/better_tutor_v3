import decamelize from "decamelize";

export default {
  placeholderObj: obj => {
    for (let key in obj) {
      obj[key] = key;
    }
  },

  mergeObjects: (obj1, obj2) => {
    for (let key in obj1) {
      if (!obj2.hasOwnProperty(key)) {
        obj2[key] = "";
      }
    }
  }
};

export const Column = function(field) {
  //still need to actually use this classname in css to change editing textarea style
  this.editorClassName = () => "editing-cell";
  this.dataField = field;
  this.text = decamelize(field, " ");
};
