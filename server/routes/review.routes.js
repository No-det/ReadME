const router = require("express").Router();
const reviewController = require("../controllers/review.controller");

const checkAuth = require("../middleware/checkAuth");

router.post("/add", checkAuth, reviewController.addReview);
router.get("/getall/:uid", checkAuth, reviewController.getReviews);
router.get("/:id", checkAuth, reviewController.getReview);
router.get("/upvote/:id", checkAuth, reviewController.upvote);

module.exports = router;
