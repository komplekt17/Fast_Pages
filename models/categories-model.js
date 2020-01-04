const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  catName: { 
  	type: String, 
  	required: true, 
  	trim: true 
  },
  catClass: { 
  	type: String, 
  	required: true, 
  	trim: true 
  },
  catColor: { 
    type: String, 
    required: true, 
    trim: true 
  },
  catBGC: { 
    type: String, 
    required: true, 
    trim: true 
  },
  userId: { 
  	type: String, 
  	required: true 
  }
}, {
  timestamps: true,
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;