const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");
const checkAuth = require("../middleware/checkAuth");

router.post("/add", checkAuth, tradeController.addTrade);
router.get("/getall", checkAuth, tradeController.getTrades);

module.exports = router;
