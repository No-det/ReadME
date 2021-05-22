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
  User.findOne({ uid: req.uid })
    .then((user) => {
      if (user) {
        if (user.following.length > 0) {
          user.following.map((followingUser) => {
            Trade.find({ uid: followingUser.uid }).then((trade) => {
              trades.push(...trade);
            });
          });
          if (trades.length < 20) {
            //  If the number of trades are less than 20
            Trade.find()
              // .sort({ createdAt: -1 })
              .limit(20)
              .then((allTrades) => {
                trades = [...trades, allTrades];
                trades.filter((val, i) => trades.indexOf(val) === i);
                return res.status(200).json({
                  success: true,
                  trades: trades,
                });
              });
          } else
            return res.status(200).json({
              success: true,
              trades: trades,
            });
        } else {
          Trade.find({})
            // .sort({ createdAt: -1 }) // Uncomment after createdAt is added
            .limit(20)
            .then((trade) => {
              return res.status(200).json({
                success: true,
                trades: trade,
              });
            });
        }
      } else
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error: error.message });
    });
};
