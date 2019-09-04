const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagesSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  ctgrId: { type: String, required: true },
  userId: { type: String, required: true },
  screen: { type: String, required: true }
}, {
  timestamps: true,
});

const Pages = mongoose.model('Pages', pagesSchema);

module.exports = Pages;