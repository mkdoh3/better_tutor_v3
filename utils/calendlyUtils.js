const moment = require("moment");
const calendly = {
  FilterHookData: data => {
    this.sessionDate = moment(data.event.start_time).format("YYYY-MM-DD");
    this.topicsCovered = data.questions_and_responses["1_response"];
    this.studentSessionTime = data.event.start_time_pretty.split(" -")[0];
    this.studentEmail = data.invitee.email;
    this.sessionId = data.event.uuid;
  }
};

module.exports = calendly;
