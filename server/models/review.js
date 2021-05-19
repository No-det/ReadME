const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  uid: { type: String, required: true },
  bookName: { type: String, required: true },
  IBNNumber: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  linkToPurchase: { type: String, required: true },
  yearOfPublication: { type: String, required: true },
  genre: { type: String, required: true },
  comments: [
    {
      uid: { type: String, required: true },
      name: { type: String, required: true },
      photoURL: { type: String, required: true },
      comment: { type: String, required: true },
      upvotes: { type: Number, required: true },
    },
  ],
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("review", ReviewSchema);
