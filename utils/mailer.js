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

const generateEmail = emailInfo => {
  const { address, name, timeDate, link } = emailInfo;
  const email = new Email({
    message: {
      from: process.env.EMAIL_ADDRESS
    },
    transport,
    send: true
  });
  email
    .send({
      template: "session-reminders",
      message: {
        to: address
      },
      locals: {
        name,
        timeDate,
        link
      }
    })
    .then(console.log)
    .catch(console.error);
};

const reminders = () => {
  emailUtils.generateRemindersList().then(emailList => {
    emailList.forEach(reminder => {
      generateEmail(reminder);
    });
  });
};

reminders();
(function() {
  cron.schedule("30 46  12 * * 5", function() {
    console.log("Running Cron Job");
    reminders();
  });
})();
