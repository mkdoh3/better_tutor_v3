const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("../google-creds");
const { promisify } = require("util");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const moment = require("moment");

const sheetsUtils = {
  //tabNumber references the tabs of a google sheet - first tab being 1
  get: async (tabNumber, options = { offset: 0 }) => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const getRows = promisify(doc.getRows);
    const rows = await getRows(tabNumber, options);
    return rows;
  },

  add: async (data, tabNumber) => {
    const useServiceAccountAuth = promisify(doc.useServiceAccountAuth);
    await useServiceAccountAuth(creds);
    const addRow = promisify(doc.addRow);
    const row = await addRow(tabNumber, data);
    return row;
  },
  deleteSession: async id => {
    sheetsUtils
      .get(1, {
        query: `sessionid=${id}`
      })
      .then(rows => rows[0].del())
      .catch(err => console.log(err));
  },

  filterSheet: async (filterBy, filterValue, tabNumber) => {
    const rows = await sheetsUtils.get(tabNumber);
    const filteredRow = await rows.filter(row => {
      return row[filterBy] === filterValue;
    });
    return filteredRow;
  },

  createSession: async data => {
    const id = data.event.uuid;
    const studentEmail = data.invitee.email;
    const time = data.event.start_time_pretty.split(" -")[0];
    const date = moment(data.event.start_time).format("YYYY-MM-DD");
    const topics = data.questions_and_responses["1_response"];
    sheetsUtils
      .filterSheet("studentemail", studentEmail, 2)
      .then(studentData => {
        const {
          classcode,
          graduationdate,
          studentname,
          studentemail,
          studentgithubusername,
          studenttz,
          tzdif,
          zoomlink
        } = studentData[0];
        sheetsUtils.add(
          {
            Class_Code: classcode,
            Graduation_Date: graduationdate,
            Student_Name: studentname,
            student_Email: studentemail,
            Student_Github_Username: studentgithubusername,
            Session_Date: date,
            Student_Tz: studenttz,
            tz_dif: tzdif,
            Student_Session_Time: time,
            Confirmation_Sent: "Y",
            Topics_Covered: topics,
            Zoom_Link: zoomlink,
            Session_ID: id
          },
          1
        );
      })
      .catch(err => console.log(err));
  }
};

module.exports = sheetsUtils;
