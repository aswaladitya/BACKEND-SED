const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true, min: 0, max: 5 },
  image: { type: String, required: true },
  link: { type: String, required: true },
  amenities: [String]

}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);