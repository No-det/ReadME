const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = require("./comment").schema;

const ReviewSchema = new Schema({
  uid: { type: String, required: true },
  displayName: { type: String, required: false },
  bookName: { type: String, required: true },
  ISBNNumber: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  linkToPurchase: { type: String, required: true },
  yearOfPublication: { type: String, required: true },
  genre: { type: String, required: true },
  comments: [CommentSchema],
  ratings: [
    {
      uid: { type: String, required: true },
      rate: { type: Number, required: false },
    },
  ],
  avgRating: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  upvotes: [{ type: String, required: false }],
});

module.exports = mongoose.model("review", ReviewSchema);
