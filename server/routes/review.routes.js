const router = require("express").Router();
const reviewController = require("../controllers/review.controller");

router.post("/add", reviewController.addReview);
router.get("/getall/:uid", reviewController.getReviews);

module.exports = router;
