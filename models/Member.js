var mongoose = require('mongoose');
var memberSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  age: Number,
  mail: {type: String, required: true, unique: true},
  photo: String,
  belongsTo: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Member', memberSchema);

