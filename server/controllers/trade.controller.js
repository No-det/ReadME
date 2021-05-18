const Trade = require("../models/trade");
const User = require("../models/user");

exports.addTrade = async (req, res) => {
  Trade.create({ ...req.body }).then((trade) => {
    User.findOne({ uid: req.body.uid })
      .then(async (user) => {
        if (user) {
          user.trades.push(trade._id);
          await user.save();
          await trade.save();
          console.log(`New trade: ${trade.bookName} by ${user.displayName}`);
          return res
            .status(201)
            .json({ success: true, message: "New trade added" });
        }
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
      });
  });
};

exports.getTrades = async (req, res) => {
  let trades = [];
  User.findOne({ uid: req.params.uid })
    .then((user) => {
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
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error: error.message });
    });
};
