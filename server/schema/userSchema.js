const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: String,
  likeStatus: Boolean,
});

module.exports = model("users", userSchema);
