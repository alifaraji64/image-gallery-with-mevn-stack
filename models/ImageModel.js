const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	filename: {
		type: String,
		unique: true,
	},
});
const ImageModel = new mongoose.model('image', imageSchema);
module.exports = ImageModel;
