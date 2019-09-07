const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  pass: {
		type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  status: {
  	type: String,
    required: true
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;