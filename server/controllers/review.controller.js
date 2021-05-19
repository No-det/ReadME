const Review = require("../models/review");
const User = require("../models/user");

exports.addReview = async (req, res) => {
  Review.create({ ...req.body }).then((review) => {
    User.findOne({ uid: req.body.uid })
      .then(async (user) => {
        if (user) {
          user.reviews.push(review._id);
          await user.save();
          await review.save();
          console.log(`New review: ${review.bookName} by ${user.displayName}`);
          return res
            .status(201)
            .json({ success: true, message: "New review added" });
        }
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
      });
  });
};

exports.getReviews = async (req, res) => {
  let reviews = [];
  User.findOne({ uid: req.params.uid })
    .then((user) => {
      if (user) {
        user.following.map((follower_id) => {
          Review.find({ uid: follower_id }).then((review) =>
            reviews.push(review)
          );
        });
        return res.status(200).json({
          success: true,
          reviews: reviews,
        });
      }
      return res.status(404).json({ success: false, error: "User not found" });
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error: error.message });
    });
};

exports.getReview = (req, res) => {
  Review.findById()
    .then((review) => {
      if (review)
        return res.status(200).json({
          success: true,
          review: review,
        });
      else
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Some error occurred. Please try again later.",
      });
    });
};
