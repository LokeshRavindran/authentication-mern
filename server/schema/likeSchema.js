const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: Boolean,
  email: String,
});

module.exports = model("likes", likeSchema);
