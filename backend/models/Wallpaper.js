const mongoose = require('mongoose');

const wallpaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);
