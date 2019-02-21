const { promisify } = require("util");
const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const casing = require("./casingUtils");
const calendly = require("./calendlyUtils");
const _ = require("lodash");

function omitData(obj) {
  //remove extra data from the sheets return that is irrelevant to the front end
  return _.omit(obj, ["_xml", "_links", "id", "save", "del", "app:edited"]);
}

function updateObj(oldObj, newObj) {
  for (let key in newObj) {
    oldObj[key] = newObj[key];
  }
  return oldObj;
}

const sheetsUtils = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  getAllRows: async (tabNumber, options = { offset: 0, formatted: true }) => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const getRows = promisify(doc.getRows);
    const rows = await getRows(tabNumber, options);
    if (options.formatted) {
      for (let i = 0; i < rows.length; i++) {
        let formattedObj = omitData(rows[i]);
        formattedObj = casing.kebabCaseToCamel(formattedObj);
        rows[i] = formattedObj;
      }
    }
    return rows;
  },

  addNewRow: async (data, tabNumber) => {
    try {
      const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
      await useServiceAccountAuth(creds);
      const addRow = promisify(doc.addRow);
      const kebabData = await casing.camelCaseToKebab(data);
      const row = await addRow(tabNumber, kebabData);
      return row;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteSession: async id => {
    try {
      const row = await sheetsUtils.getAllRows(1, {
        query: `session-id=${id}`
      });
      row[0].del();
    } catch (err) {
      throw new Error(err);
    }
  },

  updateSheet: async (updates, tableName) => {
    const tab = tableName === "sessionData" ? 1 : 2;
    const rows = await sheetsUtils.getAllRows(tab, { formatted: false });
    updates.forEach(rowData => {
      if (rowData.newRow) {
        sheetsUtils.addNewRow(rowData, tab);
      } else {
        rowData = casing.camelCaseToKebab(rowData);
        const { index } = rowData;
        const updatedRow = updateObj(rows[index], rowData);
        updatedRow.save();
      }
    });
  },

  createSession: async data => {
    const rows = await sheetsUtils.getAllRows(2);
    let newSession;
    if (data.payload) {
      const calendlyData = calendly.FilterHookData(data);
      const studentData = await rows.filter(row => {
        return row.studentEmail === calendlyData.studentEmail;
      })[0];
      newSession = { ...studentData, ...calendlyData };
    } else {
      const studentData = await rows.filter(row => {
        return row.studentName === data.studentName;
      })[0];
      newSession = { ...studentData };
    }
    try {
      sheetsUtils.addNewRow(
        {
          ...newSession,
          ConfirmationSent: "Y"
        },
        1
      );
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = sheetsUtils;
