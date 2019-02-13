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
  if (emailInfo.address) {
    this.cc = emailInfo.address;
  }
  if (typeof emailInfo[0] === "string") {
    this.bcc = emailInfo;
  }
}

function Locals(emailInfo) {
  const { name, timeDate, link } = emailInfo;
  this.name = name;
  this.timeDate = timeDate;
  this.link = link;
}

const generateEmail = (emailInfo, template) => {
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
};

const reminders = () => {
  emailUtils.generateRemindersList().then(emailList => {
    emailList.forEach(reminder => {
      generateEmail(reminder, "session-reminders");
    });
  });
};

const emailBlast = () => {
  emailUtils.generateBlastList().then(emailArray => {
    generateEmail(emailArray, "weekly-blast");
  });
};

(function() {
  cron.schedule("30 15 * * *", function() {
    console.log(`${Date.now().toLocaleString()}: Running reminders cron job`);
    reminders();
  });
  cron.schedule("30 15 * * 7", function() {
    console.log(`${Date.now().toLocaleString()}: Running email blast cron job`);
    emailBlast();
  });
})();
