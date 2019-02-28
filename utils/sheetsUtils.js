const { promisify } = require("util");
const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const casing = require("./casingUtils");
const { FilteredHookData } = require("./calendlyUtils");
const _ = require("lodash");

//this file could probably use some rewrites and better error handling

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

//tried everything I could to get the sheets api to accept an email as a query param, but it didn't like it.
//so for now at least, I'm stuck querying for everything and then filtering after the fact
async function filterStudentByEmail(email) {
  try {
    const rows = await sheetsUtils.querySheet(2);
    const studentData = await rows.filter(row => {
      return row.studentEmail === email;
    })[0];
    return studentData;
  } catch (err) {
    throw new Error(err);
  }
}

async function formatDataOnCalendly(data) {
  try {
    const calendlyData = new FilteredHookData(data);
    const studentData = await filterStudentByEmail(calendlyData.studentEmail);
    return { ...studentData, ...calendlyData };
  } catch (err) {
    throw new Error(err);
  }
}

function formatQueryReturn(rows) {
  for (let i = 0; i < rows.length; i++) {
    let formattedObj = omitData(rows[i]);
    formattedObj = casing.kebabCaseToCamel(formattedObj);
    rows[i] = formattedObj;
  }
}

const sheetsUtils = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  querySheet: async (tabNumber, options = { offset: 0, formatted: true }) => {
    try {
      const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
      await useServiceAccountAuth(creds);
      const getRows = promisify(doc.getRows);
      const rows = await getRows(tabNumber, options);
      if (options.formatted) {
        formatQueryReturn(rows);
      }
      return rows;
    } catch (err) {
      throw new Error(err);
    }
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
      const row = await sheetsUtils.querySheet(1, {
        query: `session-id=${id}`
      });
      row[0].del();
    } catch (err) {
      throw new Error(err);
    }
  },

  updateSheet: async (updates, tableName) => {
    const tab = tableName === "sessionData" ? 1 : 2;
    try {
      const rows = await sheetsUtils.querySheet(tab, { formatted: false });
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
    } catch (err) {
      throw new Error(err);
    }
  },

  createSession: async (data, date) => {
    let newSession = {
      ConfirmationSent: "Y",
      back2Back: "N",
      showNoShow: "Show"
    };
    try {
      if (data.payload) {
        const calendlyData = await formatDataOnCalendly(data.payload);
        newSession = { ...newSession, ...calendlyData };
      } else {
        const studentData = await filterStudentByEmail(data.studentEmail);
        newSession = { ...studentData };
        if (date) {
          newSession.sessionDate = date;
        }
      }
      sheetsUtils.addNewRow({ ...newSession }, 1);
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = sheetsUtils;
