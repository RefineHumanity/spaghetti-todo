var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	message: String,
	complete: {type: Boolean, default: false}
});

mongoose.model('Todo', TodoSchema);