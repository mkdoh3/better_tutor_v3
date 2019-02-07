const cron = require("node-cron");
const nodemailer = require("nodemailer");
const emailUtils = require("./emailUtils");
//need to get emailUtils returns here! Running into some crazy async problems. ermmm I could refigure it so that mailer is imported into emailUtils but I think that'll cause all sorts of other problems.. should probably walk awayyyy for a minute.ugh.
module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`
    }
  });

  cron.schedule("30 20  17 * * 0", function() {
    console.log("---------------------");
    console.log("Running Cron Job");
    let mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: "mkdohertyta@gmail.com",
      subject: "Testing this cron job!",
      text: `Hi there, this email was automatically sent by you`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  });
};
