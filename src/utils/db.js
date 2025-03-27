const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
