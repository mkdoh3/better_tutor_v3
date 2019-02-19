const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Email = require("email-templates");
const emailUtils = require("./emailUtils");

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
  send: true
});

function Message(emailInfo) {
  //this "to" field will eventually be set as centralsupport
  this.to = "mkdohertyta@gmail.com";
  if (emailInfo.studentEmail) {
    this.cc = emailInfo.studentEmail;
  }
  if (typeof emailInfo[0] === "string") {
    this.bcc = emailInfo;
  }
}

function Locals(emailInfo) {
  const { name, timeDate, zoomLink } = emailInfo;
  this.name = name;
  this.timeDate = timeDate;
  this.link = zoomLink;
}

function generateEmail(emailInfo, template) {
  const message = new Message(emailInfo);
  let locals = null;
  if (emailInfo.name) {
    locals = new Locals(emailInfo);
  }
  email
    .send({
      template,
      message,
      locals
    })
    .then(console.log)
    .catch(console.error);
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
  cron.schedule("*/10 * * * * *", function() {
    console.log(`${Date.now().toLocaleString()}: Running reminders cron job`);
    sendReminders();
  });
  cron.schedule("*/10 * * * * *", function() {
    console.log(`${Date.now().toLocaleString()}: Running email blast cron job`);
    sendBlast();
  });
})();
