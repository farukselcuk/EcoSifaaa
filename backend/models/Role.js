const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 255,
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

const Role = mongoose.model('Role', roleSchema);

module.exports = Role; 