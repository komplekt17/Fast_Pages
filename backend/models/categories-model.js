const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  catName: { type: String, required: true },
  catClass: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true,
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;