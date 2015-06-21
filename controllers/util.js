var excelParser = require('excel-parser');
var path = require('path');
var async = require('async');



/**
 * Convert excel to js array
 */
exports.convert = function(req, res, next) {
	if (req.files) {
		console.log(req.files)
		var name = req.files.file.name;
		var pat = path.join('uploads/' + name);
		excelParser.worksheets({
			inFile: pat
		}, function(err, worksheets) {
			if (err) {
				console.error(err);
			} else {
				var result = {}
				async.each(worksheets, function(sheet, callback) {
					if (sheet.id) {
						excelParser.parse({
							inFile: pat,
							worksheet: sheet.id,
							skipEmpty: true
						}, function(err, records) {
							if (err) {
								console.log(err)
							} else {
								result[sheet.id] = records;
								callback();
							}
						});

					} else {
						// Do work to process file here
						console.log('id not found');
						callback();
					}
				}, function(err) {
					// if any of the file processing produced an error, err would equal that error
					if (err) {
						// One of the iterations produced an error.
						// All processing will now stop.
					} else {
						res.send(result);
					}
				});
			}
		});
		// 	excelParser.parse({
		// 	inFile: pat,
		// 	worksheet: 1,
		// 	skipEmpty: true
		// }, function(err, records) {
		// 	if (err) {
		// 		console.log(err)
		// 		res.send({
		// 			'status': false,
		// 			'msg': "Server error" + err
		// 		})
		// 	};
		// 	res.send(records)
		// });

	} else {
		res.send({
			'status': false,
			'msg': "File Not Found"
		})
	}
}


/**
 * GET /convert
 *
 */
exports.upload = function(req, res) {
	res.render('util/upload');
};
exports.choose = function(req, res) {
	res.render('util/visual');
};

exports.graph = function(req, res) {
	console.log(req.params, req.query)
	if(req.params.id){
			res.render('graph/'+req.params.id);
	} else {
		res.send('Visulization Not Found');
	}
};

