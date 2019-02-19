const moment = require("moment");

function checkIfTomorrow(date) {
  const tomorrowsDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");

  return moment(date).format("YYYY-MM-DD") === tomorrowsDate;
}

console.log(dateToUnix("2019-02-18"));
