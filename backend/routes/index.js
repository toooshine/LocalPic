var express = require('express');
var router = express.Router();
var markerModel = require('../models/marker');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/loadMarker', function(req, res, next) {
	markerModel.find(function(err, markers) {
		res.json({ markers });
	});
});

router.post('/saveMarker', function(req, res, next) {
	var newMarker = new markerModel({
		latitude: req.body.latitude,
		longitude: req.body.longitude
	});

	newMarker.save(function(error, user) {
		console.log(user);
		res.json({ result: true });
	});
});
module.exports = router;
