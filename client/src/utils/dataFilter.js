import moment from "moment";
export default {
  filterRowData: (data, table) => {
    const filteredData = [];
    data.forEach((row, i) => {
      const rowData = {
        index: i,
        classcode: row.classcode,
        graduationdate: row.graduationdate,
        studentname: row.studentname,
        studentemail: row.studentemail,
        studentgithubusername: row.studentgithubusername,
        studenttz: row.studenttz,
        tzdif: row.tzdif,
        zoomlink: row.zoomlink
      };

      if (table === "sessions") {
        rowData.sessiondate = row.sessiondate;
        rowData.adptimein = row.adptimein;
        rowData.adptimeout = row.adptimeout;
        rowData.back2back = row.back2back;
        rowData.shownoshow = row.shownoshow;
        rowData.topicscovered = row.topicscovered;
        rowData.notes = row.notes;
        rowData.tutorsevalformsubmitted = row.tutorsevalformsubmitted;
        rowData.paymentdateamnt = row.paymentdateamnt;
      }
      filteredData.push(rowData);
    });
    return filteredData;
  },
  filterTodaysSessions: data => {
    return data.filter(session => {
      return moment().format("YYYY-MM-DD") === session.sessiondate;
    });
  },
  filterNames: data => {
    return data.map(row => row.studentname);
  }
};
