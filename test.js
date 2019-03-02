const moment = require("moment");

function checkIfTomorrow(date) {
  const tomorrowsDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");

  return moment(date).format("YYYY-MM-DD") === tomorrowsDate;
}

console.log(checkIfTomorrow("2019-03-01"));

function nextWeek(date) {
  return moment(date)
    .add(7, "days")
    .format("YYYY-MM-DD");
}

nextWeek("2019-03-01"); //?

const testObj = {
  test1(str) {
    console.log(str);
  },
  test2() {
    test = () => {
      this.test1("hi");
    };
    return true;
  }
};

testObj.test2(); //?
