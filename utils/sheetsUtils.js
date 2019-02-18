const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const casing = require("./casingUtils");
const calendly = require("./calendlyUtils");
const { promisify } = require("util");
const moment = require("moment");

const sheetsUtils = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  getAllRows: async (tabNumber, options = { offset: 0 }) => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const getRows = promisify(doc.getRows);
    const rows = await getRows(tabNumber, options);
    for (let obj of rows) {
      casing.kebabCaseToCamel(obj);
    }
    return rows;
  },
  getRosterData: async () => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const getRows = promisify(doc.getRows);
    const rows = await getRows(2);
    for (let obj of rows) {
      casing.kebabCaseToCamel(obj);
    }
    return rows;
  },

  addNewRow: async (data, tabNumber) => {
    casing.camelCaseToKebab(data);
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const addRow = promisify(doc.addRow);
    const row = await addRow(tabNumber, data);
    return row;
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
    try {
      const rows = await sheetsUtils.getAllRows(tab, { offset: 0 });
    } catch (err) {
      throw new Error(err);
    }
    const result = updates.map(update => {
      if (update.newRow) {
        sheetsUtils.addNewRow(update, tab);
      } else {
        casing.camelCaseToKebab(update);
        const row = rows[update.index];
        for (let key in update) {
          row[key] = update[key];
        }
        rows[update.index].save();
      }
    });
    return result;
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
