const path = require("path");
const router = require("express").Router();
const googleSheetsRoutes = require("./sheets");
router.use("/sheets", googleSheetsRoutes);
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
module.exports = router;
