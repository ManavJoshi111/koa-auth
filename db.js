const mongoose = require("mongoose");
const HOST = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(HOST, {
      dbName: "koa-rest-api",
      autoIndex: true,
    });
    console.log(`Connected to database --> host : ${HOST}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDB;
