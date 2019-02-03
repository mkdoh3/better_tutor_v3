const moment = require("moment");
sheets = require("./sheetsUtils");

module.exports = {
  generateBlastList: () => {
    sheets
      .getRows(2)
      .then(rows => {
        const emailList = rows.map(student => student.studentemail);
        console.log("blast list ===> ", emailList);
      })
      .catch(err => console.log(err));
  },
  generateReminders: () => {
    sheets.getRows(1).then(rows => {
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
        let sessionDate = moment(rows[i].sessiondate).format("X");

        if (sessionDate === tomorrowsDate) {
          let {
            studentemail,
            studentname,
            sessiondate,
            studentsessiontime,
            studenttz,
            zoomlink
          } = rows[i];
          let timeDate = `${moment(sessiondate).format(
            "ddd, MMM Do"
          )} ${studentsessiontime} ${studenttz}`;
          let name = studentname.split(" ")[0];
          let emailInfo = {
            address: studentemail,
            name,
            timeDate,
            link: zoomlink
          };
          upcomingSessions.push(emailInfo);
          console.log("reminders list ==>  ", upcomingSessions);
        }
      }
    });
  }
};
