const router = require("express").Router();
const sheetsController = require("../../controllers/sheetsController");

router
  .route("/session")
  .post(sheetsController.createSession)
  .delete(sheetsController.deleteRow);

router
  .route("/tab/:tab")
  .get(sheetsController.getSheetData)
  .post(sheetsController.addRow);
router.route("/update").post(sheetsController.updateRows);
router.route("/hook").post(sheetsController.handleHook);

module.exports = router;
