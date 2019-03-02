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

function getNextSessionDate(date) {
  return moment(date)
    .add(7, "days")
    .format("YYYY-MM-DD");
}

function formatTimeDate(date, time, tz) {
  return `${moment(date).format("ddd, MMM Do")} ${time} ${tz}`;
}

function findUpcomingSession(rows) {
  const upcomingSessions = [];
  //dont parse the entire sheet - just the most recent/upcoming sessions
  let i = rows.length >= 20 ? rows.length - 20 : 0;
  for (i; i < rows.length; i++) {
    const row = rows[i];
    const sessionDate = row.sessionDate;
    if (checkIfTomorrow(sessionDate)) {
      const emailInfo = formatEmailInfo(row);
      upcomingSessions.push(emailInfo);
      if (row.reoccurring.toLowerCase() === "y") {
        const date = getNextSessionDate(row.sessionDate);
        sheets.createReoccurringSession(row, date);
      }
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
    const rows = await sheets.querySheet(3);
    const emailList = await rows.map(student => student.studentEmail);
    return emailList;
  },
  generateRemindersList: async () => {
    const rows = await sheets.querySheet(2);
    const emailList = await findUpcomingSession(rows);
    return emailList;
  }
};

module.exports = emailUtils;
