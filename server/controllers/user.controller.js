const User = require("../models/user");

exports.addUser = (req, res) => {
  console.log(req.body.displayName);
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
              success: false,
              message:
                "Some error occured while creating acount. Please try again later",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Some error occurred. Try again later",
      });
    });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.uid },
      { ...req.body },
      { new: true }
    );
    if (user)
      return res.status(200).json({
        success: true,
        user: user,
      });
    else
      return res.status(404).json({
        success: false,
        message: "User details not found. Try again later!",
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Some error occurred! Try again later.",
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { uid, name, email, photoURL } = req.body; //Just to know, what is coming in body.

    const user = await User.findById(req.uid);
    let finalUsers = {};

    if (user) {
      const filteredUser = user.followers.filter(
        (follower) => follower.uid !== req.uid
      );

      if (filteredUser.length === newfollowers.length) {
        finalUsers = [...followers, req.body];
      } else {
        finalUsers = filteredUser;
      }

      const UpdatedUser = await User.findByIdAndUpdate(
        req.uid,
        { followers: newfollowers },
        { new: true }
      );

      res.status(200).json({
        success: true,
        user: UpdatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The user is not found! Try again.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Some error occured! Try again later.",
    });
  }
};
