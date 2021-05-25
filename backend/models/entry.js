const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  locationcode: { type: String, required: true },
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Entry', entrySchema);
