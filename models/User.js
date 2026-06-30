const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored as a bcrypt hash, never plain text
  watchlist: [{ type: Number }] // stores TMDB movie/show IDs
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);