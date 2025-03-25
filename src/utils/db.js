const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tusharkhatri1001:QOX5h40leRg6RHUU@cluster0.5c8uy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
