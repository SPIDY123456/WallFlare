const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePic:{type: String, required: true},
  favorites: [{ type: String }], 
  uploads: [
    {
      imageUrl: { type: String,required:true },
      tags: {type: [String],required:true},
    },  
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
