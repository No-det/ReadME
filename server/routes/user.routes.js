const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/add", userController.addUser);
router.post("/update", userController.updateUser);

module.exports = router;
