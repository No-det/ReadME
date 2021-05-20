const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  photoURL: { type: String, required: true },
  comment: { type: String, required: true },
  upvotes: [{ type: Number, required: false }],
});

module.exports = mongoose.model("comment", CommentSchema);
