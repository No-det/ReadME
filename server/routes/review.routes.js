const router = require("express").Router();
const reviewController = require("../controllers/review.controller");

const checkAuth = require("../middleware/checkAuth");

router.post("/add", checkAuth, reviewController.addReview);
router.get("/getall", checkAuth, reviewController.getReviews);
router.get("/:id", checkAuth, reviewController.getReview);
router.get("/upvoteReview/:id", checkAuth, reviewController.upvote);
router.post("/comment/:id", checkAuth, reviewController.addComment);
router.get(
  "/upvoteComment/:rid/:cid/:uid",
  checkAuth,
  reviewController.upvoteComment
);
router.post("/rate", checkAuth, reviewController.rateReview);

module.exports = router;
