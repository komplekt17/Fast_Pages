const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagesSchema = new Schema({
  name: { 
  	type: String, 
  	required: true, 
  	trim: true 
  },
  link: { 
  	type: String, 
  	required: true, 
  	trim: true 
  },
  ctgrId: { 
  	type: String, 
  	required: true 
  },
  ctgrClass: { 
    type: String 
  },
  ctgrColor: { 
    type: String 
  },
  ctgrBGC: { 
    type: String 
  },
  userId: { 
  	type: String, 
  	required: true 
  },
	screen: { 
  	type: String, 
  	required: true, 
  	trim: true 
  },
  orderNum: { 
    type: Number, 
    required: true
  }
}, {
  timestamps: true,
});

const Pages = mongoose.model('Pages', pagesSchema);

module.exports = Pages;