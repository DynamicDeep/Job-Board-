const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  contact:   { type: String, required: true },
  location:  { type: String, required: true },
  role:      { type: String, enum: ['admin', 'jobseeker', 'employer'], default: 'jobseeker' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);