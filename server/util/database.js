const mongoose = require("mongoose");

const uri = process.env.DB_CONFIG;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connection established");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

module.exports = connect;
