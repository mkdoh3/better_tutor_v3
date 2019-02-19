const moment = require("moment");
const sheets = require("./sheetsUtils");

function getFirstName(fullName) {
  return fullName.split(" ")[0];
}

function checkIfTomorrow(date) {
  const tomorrowsDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD") === tomorrowsDate;
}

function formatTimeDate(date, time, tz) {
  return `${moment(date).format("ddd, MMM Do")} ${time} ${tz}`;
}

function findUpcomingSession(rows) {
  const upcomingSessions = [];
  //dont parse the entire sheet - just the most recent/upcoming sessions
  for (let i = rows.length >= 10 ? rows.length - 10 : 0; i < rows.length; i++) {
    const sessionDate = rows[i].sessionDate;
    if (checkIfTomorrow(sessionDate)) {
      const emailInfo = formatEmailInfo(rows[i]);
      upcomingSessions.push(emailInfo);
    }
  }
  return upcomingSessions;
}

function formatEmailInfo(data) {
  const {
    studentEmail,
    studentName,
    sessionDate,
    studentSessionTime,
    studentTz,
    zoomLink
  } = data;
  const timeDate = formatTimeDate(sessionDate, studentSessionTime, studentTz);
  const name = getFirstName(studentName);
  const emailInfo = {
    studentEmail,
    name,
    timeDate,
    zoomLink
  };
  return emailInfo;
}

const emailUtils = {
  generateBlastList: async () => {
    const rows = await sheets.getAllRows(2);
    const emailList = await rows.map(student => student.studentEmail);
    return emailList;
  },
  generateRemindersList: async () => {
    const rows = await sheets.getAllRows(1);
    const emailList = await findUpcomingSession(rows);
    return emailList;
  }
};

module.exports = emailUtils;
