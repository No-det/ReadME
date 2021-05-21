const router = require("express").Router();
const userController = require("../controllers/user.controller");
const checkAuth = require("../middleware/checkAuth");

router.get("/:uid", checkAuth, userController.getUser);
router.get(
  "/profileData/:uid",
  checkAuth,
  userController.getProfileReviewsTrades
);

router.post("/add", userController.addUser);
router.post("/update", checkAuth, userController.updateUser);
router.post("/follow", checkAuth, userController.followUser);

module.exports = router;
