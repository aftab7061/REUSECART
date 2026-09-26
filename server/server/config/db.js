// config/db.js
// Handles MongoDB connection using Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  // try {
  //   const conn = await mongoose.connect(process.env.MONGO_URI);
  //   console.log(`MongoDB connected: ${conn.connection.host}`);
  // } catch (error) {
  //   console.error(`MongoDB connection error: ${error.message}`);
  //   process.exit(1);
  // }

   const con = mongoose.connect("mongodb://127.0.0.1:27017/resellhubdb");
  con.then(() => {
    console.log("Connection Done");
  });
  con.catch(() => {
    console.log("Connection Failed");
  });


};

module.exports = connectDB;
