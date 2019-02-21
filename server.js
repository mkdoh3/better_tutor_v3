require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const wwwhisper = require("connect-wwwhisper");
const app = express();
app.post("/api/sheets/hook", (req, res) => {
  console.log(req.url);
});
app.use(wwwhisper(false)); //false removes the logout iframe - login is maintained by cookies
require("./utils/mailer");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);
app.listen(PORT, () => console.log(`Ready for traffic on ${PORT}!`));
