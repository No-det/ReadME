const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = require("./review").schema;
const TradeSchema = require("./trade").schema;

const UserSchema = new Schema({
  uid: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  email: { type: String, required: true },
  banner: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
  },
  followers: [
    {
      uid: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      photoURL: { type: String, required: true },
    },
  ],
  following: [
    {
      uid: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      photoURL: { type: String, required: true },
    },
  ],
  bio: { type: String, required: false },
  reviews: [ReviewSchema],
  trades: [{ type: mongoose.Schema.Types.ObjectId, ref: "trade" }],
});

module.exports = mongoose.model("user", UserSchema);
