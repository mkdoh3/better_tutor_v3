const router = require("express").Router();
const apiRouter = require("./api");
const path = require("path");

router.use("/api", apiRouter);
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);
module.exports = router;
