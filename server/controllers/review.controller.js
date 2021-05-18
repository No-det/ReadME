const Review = require("../models/review");

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
          return res.status(201).json({ message: "New review added" });
        }
        return res.status(400).json({ error: "User not found" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
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
        return res.status(200).json(reviews);
      }
      return res.status(404).json({ error: "User not found" });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
