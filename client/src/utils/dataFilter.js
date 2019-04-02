import moment from "moment";
export default {
  // save cases in a const
  filterSessions(filterType, data) {
    switch (filterType) {
      case "today":
        return this.filterTodaysSessions(data);
      case "tomorrow":
        return this.filterTomorrowsSessions(data);
      case "weekly":
        return this.filterWeeksSessions(data);
      default:
        return console.log("filterType not provided");
    }
  },
  filterTodaysSessions(data) {
    // save date formating in a cost
    // you could also use a one-liner here.
    return data.filter(session => {
      return moment().format("YYYY-MM-DD") === session.sessionDate;
    });
  },
  filterTomorrowsSessions(data) {
    // you could one-line this. 
    return data.filter(session => {
      return (
        moment()
          .add(1, "day")
          .format("YYYY-MM-DD") === session.sessionDate
      );
    });
  },
  filterWeeksSessions(data) {
    return data.filter(session => {
      const dif = moment(session.sessionDate).diff(moment(), "days");
      return dif >= 0 && dif <= 7;
    });
  },
  // one-line this.
  filterNames(data) {
    return data.map(row => row.name);
  },
  // and this one.
  findStudent(name, roster) {
    return roster.find(student => student.name === name);
  }
};
