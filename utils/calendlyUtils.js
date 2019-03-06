const moment = require("moment");
function FilteredHookData(data) {
  this.sessionDate = moment
    .utc(data.event.invitee_start_time)
    .format("YYYY-MM-DD");
  this.topics = data.questions_and_responses["1_response"];
  this.studentTime = data.event.invitee_start_time_pretty.split(" -")[0];
  this.localTime = data.event.start_time_pretty.split(" -")[0];
  this.email = data.invitee.email;
  this.sessionId = data.event.uuid;
}

module.exports = { FilteredHookData };
