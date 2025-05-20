const mongoose = require('mongoose');

const mixtureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
  },
  how_to_use: {
    type: String,
  },
  caution: {
    type: String,
  },
  image_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Mixture = mongoose.model('Mixture', mixtureSchema);

module.exports = Mixture; 