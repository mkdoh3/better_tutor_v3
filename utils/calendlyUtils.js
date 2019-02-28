const moment = require("moment");
function FilteredHookData(data) {
  this.sessionDate = moment
    .utc(data.event.invitee_start_time)
    .format("YYYY-MM-DD");
  this.topicsCovered = data.questions_and_responses["1_response"];
  this.studentSessionTime = data.event.invitee_start_time_pretty.split(" -")[0];
  this.studentEmail = data.invitee.email;
  this.sessionId = data.event.uuid;
}

module.exports = { FilteredHookData };
