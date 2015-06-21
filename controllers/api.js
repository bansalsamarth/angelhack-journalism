var ForecastIo = require('forecastio');
var apiConfig = require('../config/api');

var forecastIo = new ForecastIo(apiConfig.forecastio);

function getForecastio(lat, lon, callback) {
	forecastIo.forecast(lat, lon, function(err, data) {
		if (err) throw err;
		return callback(data);
		// console.log(JSON.stringify(data, null, 2));
	});
}

/**
 * GET /
 * Home page.
 */
exports.getForecastio = function(req, res) {
	var lat = req.query.lat,
		lon = req.query.lon;

	if(lat && lon) {
		console.log("Will fetch cordinates for " + lat + " " + lon);
		getForecastio(lat, lon, function(data) {
			console.log(data.hourly.data);
			res.render('api/forecastio', {
				data: data
			});
		});
	}
	else{
		res.render('api/forecastio', {
			data: null
		});
	}
};

exports.getList = function(req, res) {
	res.render('api/list');
};
