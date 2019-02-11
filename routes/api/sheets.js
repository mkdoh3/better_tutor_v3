const router = require("express").Router();
const sheetsController = require("../../controllers/sheetsController");

// MB: Make sure to clean up conflicts. This breaks your whole app!
<<<<<<< HEAD
router.route("/sheets/session").post(sheetsController.createSession);
router.route("/sheets/update").post(sheetsController.update);
=======
router.route("/sheets/hook").post(sheetsController.handleHook);

>>>>>>> master
router
  .route("/sheets/:tab")
  .get(sheetsController.getRows)
  .post(sheetsController.addRow);

module.exports = router;
