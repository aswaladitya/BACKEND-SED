const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  descriptionTeaser: String, // Short version for non-hover state
  mission: String,
  missionTeaser: String,    // Short version for non-hover state
});

module.exports = mongoose.model('About', aboutSchema);