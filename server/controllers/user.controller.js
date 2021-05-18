const User = require("../models/user");

exports.addUser = (req, res) => {
  console.log(req.body);
  User.findOne({ uid: req.body.uid })
    .then((user) => {
      if (user) {
        user.populate("trades");
        user.populate("reviews");
        return res.status(200).json({ success: true, user: user });
      } else {
        const newUser = {
          uid: req.body.uid,
          displayName: req.body.displayName,
          photoURL: req.body.photoURL,
          email: req.body.email,
          followers: [],
          following: [],
          reviews: [],
          trades: [],
        };
        User.create(newUser)
          .then((user) => {
            console.log(user);
            return res.status(200).json({
              success: true,
              user: user,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              error:
                "Some error occured while creating acount. Please try again later",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "Some error occurred. Try again later",
      });
    });
};
