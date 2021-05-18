const Trade = require("../models/trade");
const User = require("../models/user");

exports.addTrade = async (req, res) => {
  let newTrade;
  Trade.create({ ...req.body }).then(async (trade) => {
    newTrade = await trade.save();
    console.log(newTrade);
    User.findOne({ uid: newTrade.uid })
      .then((user) => {
        console.log(user);
        if (user) {
          user.trades.push(newTrade._id);
          user.save();
          console.log(`New trade added by ${user.displayName} !`);
          return res.status(201).json({ message: "New trade added" });
        }
        return res.status(404).json({ error: "User not found" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error.message });
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
        return res.status(200).json(trades);
      }
      return res.status(404).json({ error: "User not found" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
