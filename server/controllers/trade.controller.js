const Trade = require("../models/trade");
const User = require("../models/user");

exports.addTrade = async (req, res) => {
  let newTrade;
  Trade.create({ ...req.body }).then(async (trade) => {
    trade = { ...trade, uid: req.params.uid };
    newTrade = await trade.save();
    try {
      User.findOne({ uid: req.params.uid }).then((user) => {
        if (user) {
          user.trades.push(newTrade._id);
          user.save();
          return res
            .status(201)
            .json({ success: true, message: "Added the trade post!" });
        }
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: "Some error occured. Please try again later.",
      });
    }
  });
};

exports.getTrades = async (req, res) => {
  try {
    let trades = [];
    User.findOne({ uid: req.params.uid }).then((user) => {
      if (user) {
        user.following.map((follower_id) => {
          Trade.find({ uid: follower_id }).then((trade) => trades.push(trade));
        });
        return res.status(200).json({
          success: true,
          trades: trades,
        });
      }
      return res.status(404).json({ success: false, error: "User not found" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
