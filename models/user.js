const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [2, "Name should have at least 2 characters!"],
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: [6, "Password should have at least 6 characters"],
    max: [10, "Password should have at most 10 characters"],
    required: true,
  },
});

userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  await this.save();
  console.log("Generated Token is :", token);
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
