const { model, Schema } = require("mongoose");

const choiceSchema = new Schema({
  tweeti: {
    type: Schema.Types.ObjectId,
    ref: "Tweeti",
  },
  text: String,
  selected: [String],
});

module.exports = model("Choice", choiceSchema, "choices");
