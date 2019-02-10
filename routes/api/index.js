const router = require("express").Router();
const googleSheetsRoutes = require("./sheets");
router.use(googleSheetsRoutes);
module.exports = router;
