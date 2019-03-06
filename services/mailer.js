const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Email = require("email-templates");
const emailUtils = require("../utils/emailUtils");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_ADDRESS}`,
    pass: `${process.env.EMAIL_PASSWORD}`
  }
});
const email = new Email({
  message: {
    from: process.env.EMAIL_ADDRESS
  },
  transport,
  send: true //set to false for testing
});

function Message(emailInfo) {
  if (emailInfo.email) {
    this.to = emailInfo.email;
    this.cc = ["mkdohertyta@gmail.com", "centraltutorsupport@bootcampspot.com"];
  }
  if (typeof emailInfo[0] === "string") {
    this.to = "mkdohertyta@gmail.com";
    this.cc = "centraltutorsupport@bootcampspot.com";
    this.bcc = emailInfo;
  }
}

function Locals(emailInfo) {
  const { firstName, timeDate, zoomLink } = emailInfo;
  this.firstName = firstName;
  this.timeDate = timeDate;
  this.link = zoomLink;
}

function generateEmail(emailInfo, template) {
  const message = new Message(emailInfo);
  let locals = null;
  if (template === "session-reminders") {
    locals = new Locals(emailInfo);
  } else if (template === "congrats") {
    locals = { firstName: emailInfo.firstName };
  }
  email
    .send({
      template,
      message,
      locals
    })
    .then(console.log("email sent successfully"))
    .catch(console.error);
}

function sendCongrats() {
  emailUtils.generateCongratsList().then(emailList => {
    emailList.forEach(grad => {
      generateEmail(grad, "congrats");
    });
  });
}

function sendReminders() {
  emailUtils.generateRemindersList().then(emailList => {
    emailList.forEach(reminder => {
      generateEmail(reminder, "session-reminders");
    });
  });
}

function sendBlast() {
  emailUtils.generateBlastList().then(emailArray => {
    generateEmail(emailArray, "weekly-blast");
  });
}

(function() {
  cron.schedule("30 17 * * *", function() {
    console.log(`${Date.now().toLocaleString()}: Running reminders cron job`);
    sendCongrats();
    //also inserts next weeks session for reoccurring events
    sendReminders();
  });
  cron.schedule("30 16 * * 7", function() {
    console.log(`${Date.now().toLocaleString()}: Running email blast cron job`);
    sendBlast();
  });
})();
