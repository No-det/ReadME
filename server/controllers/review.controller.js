const Review = require("../models/review");
const User = require("../models/user");

exports.addReview = async (req, res) => {
  console.log(req.body);

  User.findOne({ uid: req.body.uid })
    .then(async (user) => {
      if (user) {
        Review.create({ ...req.body }).then(async (review) => {
          user.reviews.push(review._id);
          await user.save();
          await review.save();
          console.log(`New review: ${review.bookName} by ${user.displayName}`);
          return res
            .status(201)
            .json({ success: true, message: "New review added" });
        });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    });
};

exports.getReviews = async (req, res) => {
  let reviews = [];
  User.findOne({ uid: req.params.uid })
    .then((user) => {
      if (user) {
        if (user.following.length > 0) {
          user.following.map((follower_id) => {
            Review.find({ uid: follower_id }).then((review) =>
              reviews.push(review)
            );
          });
          return res.status(200).json({
            success: true,
            reviews: reviews,
          });
        } else {
          Review.find({})
            .sort({ createdAt: -1 })
            .limit(20)
            .then((reviews) => {
              return res.status(200).json({
                success: true,
                reviews: reviews,
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Some error occured. Please try again later",
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

exports.getReview = (req, res) => {
  Review.findById(req?.params?.id)
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

exports.upvote = async (req, res) => {
  try {
    const review = Review.findById(req?.params?.id);
    let currentUpvote = review.upvote;
    let indexOfUpvote = currentUpvote.indexOf(req.uid);
    let newUpvotes = [];
    if (indexOfUpvote !== -1)
      newUpvotes = currentUpvote.splice(indexOfUpvote, 1);
    else newUpvotes = currentUpvote.push(req.uid);
    const newReview = Review.findByIdAndUpdate(
      req?.params?.id,
      { upvote: newUpvotes },
      { new: true }
    );
    res.state(200).json({
      success: true,
      review: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some error occurred! Please try again later.",
    });
  }
};
