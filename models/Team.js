var mongoose = require('mongoose');
var teamSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: String,
  members: [String],
  color: String,
  updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Team', teamSchema);

