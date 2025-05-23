const mongoose = require('mongoose');

const herbSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  benefits: {
    type: [String],
    default: [],
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

const Herb = mongoose.model('Herb', herbSchema);

module.exports = Herb; 