const router = require("express").Router();
const sheetsController = require("../../controllers/sheetsController");

router.route("/sheets/session").post(sheetsController.createSession);
router.route("/sheets/update").post(sheetsController.update);
router.route("/sheets/hook").post(sheetsController.handleHook);

router
  .route("/sheets/:tab")
  .get(sheetsController.getRows)
  .post(sheetsController.addRow);

module.exports = router;
