const router = require("express").Router();
const apiController = require("../controllers/api.controller");

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "API Working",
  });
});

router.post("/addUser", apiController.addUser);

module.exports = router;
