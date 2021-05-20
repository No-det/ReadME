const router = require("express").Router();
const userController = require("../controllers/user.controller");
const checkAuth = require("../middleware/checkAuth");

router.post("/add", userController.addUser);
router.post("/update", checkAuth, userController.updateUser);
router.post("/follow", checkAuth, userController.followUser);

module.exports = router;
