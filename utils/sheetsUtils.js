const { promisify } = require("util");
const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const casing = require("./casingUtils");
const { FilteredHookData } = require("./calendlyUtils");
const _ = require("lodash");
const uniqid = require("uniqid");

//these functions should be moved into obj utils
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
    const rows = await sheetsUtils.querySheet(3);
    const studentData = await rows.filter(row => {
      return row.email === email;
    })[0];
    return studentData;
  } catch (err) {
    throw new Error(err);
  }
}

async function formatDataOnCalendly(data) {
  try {
    const calendlyData = new FilteredHookData(data);
    const studentData = await filterStudentByEmail(calendlyData.email);
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

//true much more often than not
const sessionDefaults = {
  confirmed: "Y",
  b2b: "N",
  showNoShow: "Show"
};

const sheetsUtils = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  /***** Always write to the unsorted session sheet! *****/
  async querySheet(tabNumber, options = { offset: 0, formatted: true }) {
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

  async addNewRow(data, tabNumber) {
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

  async deleteSession(id) {
    try {
      const row = await this.querySheet(2, {
        query: `session-id=${id}`
      });
      row[0].del();
    } catch (err) {
      throw new Error(err);
    }
  },
  async removeStudent(github) {
    try {
      const row = await this.querySheet(3, {
        query: `github=${github}`
      });
      row[0].del();
    } catch (err) {
      throw new Error(err);
    }
  },
  //should query each row one at a time using the session id if not a new row?
  ///////////////
  ///////////////   still need to change the frontend 'updated' state to be sessionId instead of index
  //////////////////
  //////////////
  async updateSheet(updates, tableName) {
    const tab = tableName === "sessionData" ? 2 : 3;
    for (let update of updates) {
      if (update.newRow) {
        this.addNewRow(update, tab);
      } else {
        update = casing.camelCaseToKebab(update);
        try {
          const response = await this.querySheet(tab, {
            query: `session-id=${update["session-id"]}`
          });
          const row = response[0];
          const updatedRow = updateObj(row, update);
          updatedRow.save();
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  },

  async createSession(data) {
    try {
      const calendlyData = await formatDataOnCalendly(data.payload);
      const newSession = { ...sessionDefaults, ...calendlyData };
      this.addNewRow({ ...newSession }, 2);
    } catch (err) {
      throw new Error(err);
    }
  },

  async createReoccurringSession(sessionData, sessionDate) {
    try {
      sessionData.sessionDate = sessionDate;
      sessionData.sessionId = uniqid();
      this.addNewRow({ ...sessionData }, 2);
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = sheetsUtils;
