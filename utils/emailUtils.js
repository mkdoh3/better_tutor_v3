const moment = require("moment");
const sheets = require("./sheetsUtils");

const emailUtils = {
  generateList: async tab => {
    const rows = await sheets.get(tab);
    let emailList;
    if (tab === 1) {
      emailList = await emailUtils.findUpcomingSessions(rows);
    } else {
      emailList = await rows.map(student => student.studentemail);
    }
    return emailList;
  },
  findUpcomingSessions: rows => {
    const upcomingSessions = [];
    //to get unix time based on a general date instead of an exact timestamp we first have to create
    //a YYY-MM-DD formatted date and then convert it back to seconds
    const tomorrowsDate = moment(moment().format("YYYY-MM-DD"))
      .add(1, "day")
      .format("X");

    //dont parse the entire sheet - just the most recent/upcoming sessions
    for (
      let i = rows.length >= 10 ? rows.length - 10 : 0;
      i < rows.length;
      i++
    ) {
      const sessionDate = moment(rows[i].sessiondate).format("X");

      if (sessionDate === tomorrowsDate) {
        const {
          studentemail,
          studentname,
          sessiondate,
          studentsessiontime,
          studenttz,
          zoomlink
        } = rows[i];
        const timeDate = `${moment(sessiondate).format(
          "ddd, MMM Do"
        )} ${studentsessiontime} ${studenttz}`;
        const name = studentname.split(" ")[0];
        const emailInfo = {
          address: studentemail,
          name,
          timeDate,
          link: zoomlink
        };
        upcomingSessions.push(emailInfo);
      }
    }
    return upcomingSessions;
  }
};

module.exports = emailUtils;
