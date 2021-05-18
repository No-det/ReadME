const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");

router.post("/add", tradeController.addTrade);
router.get("/getall/:uid", tradeController.getTrades);

module.exports = router;
