const mongoose = require('mongoose');

var markerSchema = mongoose.Schema({
	latitude: Number,
	longitude: Number
});

var markerModel = mongoose.model('marker', markerSchema);

module.exports = markerModel;
