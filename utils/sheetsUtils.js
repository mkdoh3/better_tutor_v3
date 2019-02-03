const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

//tabNumber references the tabs of a google sheet - first tab being 1
const getRows = tabNumber => {
  return new Promise((resolve, reject) => {
    return doc.useServiceAccountAuth(creds, error => {
      if (error) reject(error);
      return doc.getRows(tabNumber, (error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    });
  });
};

const addRow = (data, tabNumber) => {
  return new Promise((resolve, reject) => {
    return doc.useServiceAccountAuth(creds, error => {
      if (error) reject(error);
      return doc.addRow(tabNumber, data, (error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    });
  });
};

module.exports = { getRows, addRow };
