const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MG_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};

module.exports = dbconnect;
