const moment = require("moment");
const sheets = require("./sheetsUtils");

function getFirstName(fullName) {
  return fullName.split(" ")[0];
}

function checkIfTomorrow(date) {
  const tomorrowsDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");
  return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD") === tomorrowsDate;
}
function checkIfToday(date) {
  return (
    moment(date, "YYYY-MM-DD").format("YYYY-MM-DD") ===
    moment().format("YYYY-MM-DD")
  );
}

function getNextSessionDate(date) {
  return moment(date, "YYYY-MM-DD")
    .add(7, "days")
    .format("YYYY-MM-DD");
}

function formatTimeDate(date, time, tz) {
  return `${moment(date).format("ddd, MMM Do")} ${time} ${tz}`;
}

function findGraduates(rows) {
  const grads = [];
  rows.forEach(row => {
    if (checkIfToday(row.graduationDate)) {
      grads.push({ email: row.email, firstName: getFirstName(row.name) });
      sheets.removeStudent(row.github);
    }
  });
  return grads;
}

function findUpcomingSession(rows) {
  const upcomingSessions = [];
  //dont parse the entire sheet - just the most recent/upcoming sessions
  let i = rows.length >= 20 ? rows.length - 20 : 0;
  for (i; i < rows.length; i++) {
    const row = rows[i];
    const sessionDate = row.sessionDate;
    //can this be simplified by using filter instead??
    if (checkIfTomorrow(sessionDate)) {
      const emailInfo = formatEmailInfo(row);
      upcomingSessions.push(emailInfo);
      //kind of dont like mixing this logic into the email utils because its unrelated.. but it does fit here very nicely
      if (row.reoccurring.toLowerCase() === "y") {
        const date = getNextSessionDate(row.sessionDate);
        sheets.createReoccurringSession(row, date);
      }
    }
  }
  return upcomingSessions;
}

function formatEmailInfo(data) {
  const { email, name, sessionDate, studentTime, studentTz, zoomLink } = data;
  const timeDate = formatTimeDate(sessionDate, studentTime, studentTz);
  const firstName = getFirstName(name);
  const emailInfo = {
    email,
    firstName,
    timeDate,
    zoomLink
  };
  return emailInfo;
}

const emailUtils = {
  generateBlastList: async () => {
    const rows = await sheets.querySheet(3);
    const emailList = await rows.map(student => student.email);
    return emailList;
  },
  generateRemindersList: async () => {
    const rows = await sheets.querySheet(2);
    const emailList = await findUpcomingSession(rows);
    return emailList;
  },
  generateCongratsList: async () => {
    const rows = await sheets.querySheet(3);
    const emailList = await findGraduates(rows);
    //got the list of graduates emails - just need to build the template and send an email to each of them!
    return emailList;
  }
};
emailUtils.generateRemindersList();

module.exports = emailUtils;
