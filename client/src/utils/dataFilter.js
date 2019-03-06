import moment from "moment";
export default {
  filterTodaysSessions: data => {
    return data.filter(session => {
      return moment().format("YYYY-MM-DD") === session.sessionDate;
    });
  },
  filterNames: data => {
    return data.map(row => row.name);
  },
  findStudent: (name, roster) => {
    return roster.find(student => student.name === name);
  }
};
