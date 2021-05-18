const Review = require("../models/review");
const User = require("../models/user");

exports.addReview = async (req, res) => {
  let newReview;
  Review.create({ ...req.body }).then(async (review) => {
    review = { ...review, uid: req.params.uid };
    newReview = await review.save();
    try {
      User.findOne({ uid: req.params.uid }).then((user) => {
        if (user) {
          user.reviews.push(newReview._id);
          user.save();
          console.log(user);
          return res
            .status(201)
            .json({ success: true, message: "New review added" });
        }
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });
};

exports.getReviews = async (req, res) => {
  try {
    let reviews = [];
    User.findOne({ uid: req.params.uid }).then((user) => {
      if (user) {
        user.following.map((follower_id) => {
          Review.find({ uid: follower_id }).then((review) =>
            reviews.push(review)
          );
        });
        return res.status(200).json({
          success: false,
          reviews: reviews,
        });
      }
      return res.status(404).json({ success: false, error: "User not found" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        error: "Some error occured. Please try again later",
      });
  }
};
