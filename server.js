const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//database
mongoose
	.connect('mongodb://localhost:27017', {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('mongodb connected');
	});
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//controllers
const controller = require('./controllers/controller');
//API routes
app.post('/upload', controller.uploadImage);
app.get('/retrieve', controller.retrieveImages);
app.delete('/delete/:id', controller.deleteImage);

app.listen(3000, () => {
	console.log('server started');
});
