const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const { promisify } = require("util");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

module.exports = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  getRows: async tabNumber => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const getRows = promisify(doc.getRows);
    const rows = await getRows(tabNumber);
    return rows;
  },

  addRow: async (data, tabNumber) => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const addRow = promisify(doc.addRow);
    const row = await addRow(tabNumber, data);
    return row;
  }
};
