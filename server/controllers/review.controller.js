const Review = require("../models/review");
const User = require("../models/user");
const Comment = require("../models/comment");
const comment = require("../models/comment");

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
  console.log(req.uid);
  User.findOne({ uid: req.uid })
    .then((user) => {
      if (user) {
        if (user.following.length > 0) {
          user.following.map((followingUser) => {
            Review.find({ uid: followingUser.uid }).then((review) => {
              reviews.push(...review);
              console.log(reviews);
            });
          });
          if (reviews.length < 20) {
            // .sort({ createdAt: -1 })
            Review.find({})
              .limit(20)
              .then((allReview) => {
                reviews = [...reviews, ...allReview];
                reviews.filter((val, i) => reviews.indexOf(val) === i);
                return res.status(200).json({
                  success: true,
                  reviews: reviews,
                });
              });
          } else
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
    const review = await Review.findById(req?.params?.id);
    let currentUpvote = review.upvotes;
    let indexOfUpvote = currentUpvote.indexOf(req.uid);
    let newUpvotes = [];
    if (indexOfUpvote !== -1) {
      newUpvotes = currentUpvote.filter((upvote) => upvote !== req.uid);
    } else {
      newUpvotes = [...currentUpvote, req.uid];
    }
    const newReview = await Review.findByIdAndUpdate(
      req?.params?.id,
      { upvotes: newUpvotes },
      { new: true }
    );
    res.status(200).json({
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

exports.addComment = (req, res) => {
  User.findOne({ uid: req.body.uid })
    .then((user) => {
      if (user) {
        Review.findOne({ _id: req.params.id })
          .then(async (review) => {
            if (review) {
              let comment = await Comment.create({
                uid: req.body.uid,
                name: user.displayName,
                photoURL: user.photoURL,
                comment: req.body.comment,
                upvotes: [],
              });
              review.comments.push(comment);
              await review.save();
              return res
                .status(201)
                .json({ success: true, message: "Comment added" });
            }
            return res
              .status(404)
              .json({ success: false, message: "Review not found." });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Some error occured. Please try again later.",
            });
          });
      }
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Some error occured. Please try again later.",
      });
    });
};

exports.upvoteComment = (req, res) => {
  Review.findOne({ _id: req.params.rid })
    .then(async (review) => {
      if (review) {
        let comments = review.comments;
        comment = comments.find((doc) => doc._id == req.params.cid);
        if (comment) {
          if (comment.upvotes.contains(req.param.uid))
            comment.upvotes = comment.upvotes.filter(
              (uid) => uid !== req.params.uid
            );
          else comment.upvotes = [...comment.upvotes, req.params.uid];
          review.comments = [
            ...comments.filter((doc) => doc._id !== comment._id),
            comment,
          ];
          await review.save();
          return res
            .status(200)
            .json({ success: true, message: "Comment upvoted" });
        }
        return res
          .status(404)
          .json({ success: false, message: "Comment not found." });
      }
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Some error occured. Please try again later.",
      });
    });
};

exports.rateReview = (req, res) => {
  Review.findOne({ _id: req.body.id })
    .then(async (review) => {
      let ratedUsers = review.ratings.map((rev) => rev.uid);
      if (ratedUsers.includes(req.uid)) {
        if (review) {
          review.ratings.push({ uid: req.uid, rate: req.body.rating });
          let ratings = review.ratings.map((rev) => rev.rate);
          let avgRating = 0;
          if (ratings.length > 0) {
            avgRating = ratings.reduce((a, b) => a + b) / ratings.length;
          }
          review.avgRating = parseFloat(avgRating.toFixed(1));
          await review.save();
          return res.status(200).json({
            success: true,
            message: "Rated the review successfully",
            average: review.avgRating,
          });
        }
        return res.status(208).json({
          success: false,
          message: "You have already rated the review !",
          average: review.avgRating,
        });
      }
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Some error occured. Please try again later.",
      });
    });
};
