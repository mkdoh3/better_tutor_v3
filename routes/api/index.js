const router = require("express").Router();
const googleSheetsRoutes = require("./sheets");
router.use("/google", googleSheetsRoutes);
module.exports = router;
