const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const ImageModel = require('../models/ImageModel');
const ObjectId = require('mongoose').Types.ObjectId;
let directory = path.join(__dirname, '../public/image');
module.exports = {
	uploadImage: function (req, res) {
		let form = new formidable.IncomingForm();
		//check if directory exists
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		//setting the upload directory to the one that we just create
		form.uploadDir = directory;
		form.parse(req, function (err, fields, files) {
			if (err) throw err;
			let newImage = new ImageModel({
				title: fields.title,
				filename: files.image.name,
			});
			fs.rename(files.image.path, path.join(directory, files.image.name), (err) => {
				if (err) throw err;
				newImage
					.save()
					.then((image) => {
						res.setHeader('Content-Type', 'application/json');
						res.status(200).send(image);
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	},
	retrieveImages: function (req, res) {
		ImageModel.find({})
			.then((images) => {
				res.status(200).send(images);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	deleteImage: function (req, res) {
		let id = req.params.id;
		ImageModel.findByIdAndRemove(id, (err, data) => {
			if (err) throw err;
			console.log('image deleted successfully');
			ImageModel.find({})
				.then((data) => {
					res.status(200).send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},
};
