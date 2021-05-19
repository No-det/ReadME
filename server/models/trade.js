const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  uid: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  bookName: { type: String, required: true },
  genre: { type: String, required: true },
});

module.exports = mongoose.model("trade", TradeSchema);