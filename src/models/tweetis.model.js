const { model, Schema } = require("mongoose");

const tweetiSchema = new Schema({
  id_author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name_author: String,
  text: String,
  question: String,
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Tweeti", tweetiSchema, "tweetis");
