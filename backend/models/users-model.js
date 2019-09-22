const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({error: 'Invalid Email address'})
      }
    }
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true,
});

    // Hash the pass before saving the user model
    // Хешируем пароль перед сохранением пользовательской модели
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('pass')) {
    user.pass = await bcrypt.hash(user.pass, 8)
  }
  next()
})

    // Generate an auth token for the user
    // Генерируем авторизационный токен для пользователя
userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

    // Search for a user by login and pass.
    // Поиск пользователя по электронной почте и паролю.
userSchema.statics.findByCredentials = async (login, pass) => {
  let user = {}
  const result = await User.findOne({ login })
  if (!result) {
    user = { error: 'Invalid login credentials' }
  }
  else{
    user = result
    const isPasswordMatch = await bcrypt.compare(pass, user.pass)
    if (!isPasswordMatch) {
      user = { error: 'Invalid password credentials' }
    }
  }
  return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;