const router = require("express").Router();
const googleSheetRoutes = require("./sheets");
router.use("/google", googleSheetRoutes);
module.exports = router;
