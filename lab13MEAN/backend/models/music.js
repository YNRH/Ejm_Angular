// music.js (model)
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, enum: ['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Other'], required: true },
  audioPath: { type: String, required: true },
});

module.exports = mongoose.model('Music', musicSchema);

