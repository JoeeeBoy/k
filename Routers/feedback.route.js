const Router = require("express");
const { feedbackController } = require("../Controllers/feedback.controller");
const router = Router();

router.get("/feedback", feedbackController.getFeedback);
router.get("/feedback/:id", feedbackController.getIdFeedback);
router.post("/book/:book/feedback", feedbackController.postFeedback);
router.delete("/admin/feedback/:id", feedbackController.deleteFeedback);
router.patch("/admin/feedback/:id", feedbackController.patchFeedback);

module.exports = router;
