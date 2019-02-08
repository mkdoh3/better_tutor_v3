require("dotenv").config();
const express = require("express");
const router = require("./routes");
const emailUtils = require("./utils/emailUtils");
const sheets = require("./utils/sheetsUtils");
require("./utils/mailer");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`Ready for traffic on ${PORT}!`));
// emailUtils.generateBlastList();
// sheets.addRow({ Student_Name: "Michael" }, 2).then(res => console.log(res));
// emailUtils.generateBlastList().then(list => console.log(list));
// emailUtils
//   .generateReminders()
//   .then(emailList => console.log("reminders list: ", emailList));
