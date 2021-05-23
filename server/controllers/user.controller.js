const User = require("../models/user");
const Review = require("../models/review");
const Trade = require("../models/trade");

exports.addUser = (req, res) => {
  console.log(req.body.displayName);
  User.findOne({ uid: req.body.uid })
    .then(async (user) => {
      if (user) {
        await user.populate("trades").execPopulate();
        await user.populate("reviews").execPopulate();
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
          ratings: [],
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
    const { uid, name, email, photoURL } = req.body; //Just to know, what is coming in query.

    const user = await User.findOne({ uid: req.uid });
    let finalUsers = [];
    let finalChats = [];

    if (user) {
      const following = user.following;
      const chats = user.chats;

      const filteredUser = following.filter(
        (following) => following.uid !== uid
      );

      if (filteredUser.length === following.length) {
        finalUsers = [...following, req.body];
        finalChats = [...chats, req.body];
      } else {
        finalUsers = filteredUser;
        finalChats = chats;
      }

      const UpdatedUser = await User.findOneAndUpdate(
        { uid: req.uid },
        { following: finalUsers, chats: finalChats },
        { new: true }
      );

      if (UpdatedUser) {
        // Now the users account is added with a following, and want to add this user to followers of the other person
        console.log("Etho oruthan followers koodiyo korayuo cheythu");
        let finalFollowers = [];
        const otherUser = await User.findOne({ uid: uid });

        if (otherUser) {
          const followers = otherUser.followers;
          const otherChats = otherUser.chats;
          const filteredOtherUser = followers.filter(
            (followers) => followers.uid !== req.uid
          );
          if (chats.filter((chat) => chat.uid === req.uid).length === 0) {
            finalOtherChats = [
              ...otherChats,
              {
                uid: UpdatedUser.uid,
                name: UpdatedUser.displayName,
                photoURL: UpdatedUser.photoURL,
                email: UpdatedUser.email,
              },
            ];
          }

          if (filteredOtherUser.length === followers.length) {
            finalFollowers = [
              ...followers,
              {
                uid: UpdatedUser.uid,
                name: UpdatedUser.displayName,
                photoURL: UpdatedUser.photoURL,
                email: UpdatedUser.email,
              },
            ];
          } else {
            finalFollowers = filteredOtherUser;
            finalOtherChats = otherChats;
          }

          const UpdatedOtherUser = await User.findOneAndUpdate(
            { uid: uid },
            { followers: finalFollowers, chats: finalOtherChats },
            { new: true }
          );

          if (UpdatedOtherUser) {
            console.log("Etho oruthan following koodiyo korayuo cheythu");
            res.status(200).json({
              success: true,
              user: UpdatedUser,
            });
          } else {
            res.status(404).json({
              success: false,
              message: "The user not found!",
            });
          }
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Error updating user!",
        });
      }
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

exports.getUser = (req, res) => {
  User.findOne({ uid: req.params.uid })
    .then(async (user) => {
      if (user) {
        await user.populate("trades").execPopulate();
        await user.populate("reviews").execPopulate();
        console.log(user);
        return res.status(200).json({
          success: true,
          user: user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        success: false,
        message:
          "Some error occured while fetching the user data. Please try again later",
      });
    });
};

exports.getProfileReviewsTrades = async (req, res) => {
  try {
    console.log(req.params.uid);
    const reviews = await Review.find({ uid: req.params.uid });
    const trades = await Trade.find({ uid: req.params.uid });
    console.log(reviews, trades);
    return res.status(200).json({
      success: true,
      reviews: reviews,
      trades: trades,
    });
  } catch (err) {
    console.log("ERROR: ", err);
    return res.status(500).json({
      success: false,
      message:
        "Some error occured while fetching the reviews and trades of the user. Please try again after sometime",
    });
  }
};

exports.updateUserChat = (req, res) => {
  User.findOne({ uid: req.uid })
    .then(async (user) => {
      if (user) {
        const userDetails = {
          uid: user.uid,
          photoURL: user.photoURL,
          name: user.displayName,
        };
        if (
          user.chats.filter((userId) => userId.uid === req.params.uid).length >
          0
        ) {
          await user.populate("trades").execPopulate();
          await user.populate("reviews").execPopulate();
          return res.status(200).json({
            success: true,
            user: user,
          });
        } else {
          const otherUser = await User.findOne({ uid: req.params.uid });
          const newChat = [
            ...user.chats,
            {
              uid: req.params.uid,
              name: otherUser.displayName,
              photoURL: otherUser.photoURL,
            },
          ];
          const updatedUser = await User.findOneAndUpdate(
            { uid: req.uid },
            { chats: newChat },
            { new: true }
          );
          await user.populate("trades").execPopulate();
          await user.populate("reviews").execPopulate();
          res.status(200).json({
            success: true,
            user: updatedUser,
          });
          User.findOne({ uid: req.params.uid }).then(async (user) => {
            if (user) {
              if (
                user.chats.filter((userId) => userId.uid === req.uid).length ===
                0
              ) {
                const newOtherChat = [...user.chats, userDetails];
                const updatedOtherUser = await User.findOneAndUpdate(
                  { uid: req.params.uid },
                  { chats: newOtherChat }
                );
              }
            }
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "User doesn't exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Some error occured",
      });
    });
};
