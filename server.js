require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Ready for traffic on ${PORT}!`));
