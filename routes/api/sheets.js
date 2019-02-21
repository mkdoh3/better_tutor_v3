const router = require("express").Router();
const sheetsController = require("../../controllers/sheetsController");

router.route("/session").post(sheetsController.createSession);
router.route("/update").post(sheetsController.updateRows);
router.route("/hook").post(sheetsController.handleHook);

router
  .route("/tab/:tab")
  .get(sheetsController.getSheetData)
  .post(sheetsController.addRow);

module.exports = router;
