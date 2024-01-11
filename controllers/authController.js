const { User } = require("../models");
const bcrypt = require("bcryptjs");

const login = async (ctx) => {
  try {
    const { email, password } = ctx.request?.body;
    console.log("body: ", email, password);
    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provided required details!" };
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "Invalid credentials or you don't have any account",
      };
      return;
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Invalid credentials or you don't have any account",
      };
      return;
    }
    const token = await user.generateAuthToken();
    ctx.body = { message: "Loggedin successfully", token };
    return;
  } catch (err) {
    console.log("Error in login: ", err);
    ctx.response.status = 500;
    ctx.body = err;
  }
};

const signup = async (ctx) => {
  try {
    const { name, email, password } = ctx.request?.body;
    console.log("body: ", ctx.request.body);
    if (!name || !email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provided required details!" };
      return;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "An account with this email id already exists!",
      };
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const token = await user.generateAuthToken();
    await user.save();
    ctx.response.status = 200;
    ctx.response.body = {
      message: "You account has been successfully created!",
      token,
    };
    return;
  } catch (err) {
    ctx.response.status = 500;
    console.log("error in signup: ", err);
    ctx.body = err;
  }
};

module.exports = {
  login,
  signup,
};
