require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const wwwhisper = require("connect-wwwhisper");
// const sheets = require("./utils/sheetsUtils");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(wwwhisper());
// app.post("/api/sheets/hook", (req, res) => {
//   if (req.body.event === "invitee.created") {
//     sheets.createSession(req.body, true).then(() => {
//       res.status(200).send("OK");
//     });
//   } else {
//     sheets.deleteSession(req.body.payload.event.uuid).then(() => {
//       res.status(200).send("OK");
//     });
//   }
// });
require("./utils/mailer");
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);
app.listen(PORT, () => console.log(`Ready for traffic on ${PORT}!`));
