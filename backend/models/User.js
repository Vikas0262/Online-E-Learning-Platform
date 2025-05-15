const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  enrolledCourses: [{
    title: String,
    orderId: String,
    date: Date,
    price: String,
    videoUrl: String
  }]
});

module.exports = mongoose.model('User', userSchema);
