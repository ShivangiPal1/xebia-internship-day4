const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String
  },
  { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
