	  $('#button').click(function(event) {
		event.preventDefault();
        $($('#uploadForm')).ajaxSubmit({

            error: function(xhr) {
                    console.log('Error: ' + xhr.status);
            },

            success: function(response) {
                      console.log(response);
            }
    });
    	return false;
    });  
	var checkindex = function(result, name) {
		var res = {}
		res.check = false;
		res.index = "";
		for (var i = result.length - 1; i >= 0; i--) {
			if (result[i].Name == name) {
				res.check = true
				res.index = i;
			}
		}
		return res;
	}

	var parse = function(json) {
		json = JSON.parse(json) || json;
		var result = []
		var keys = Object.keys(json);
		for (var i = keys.length - 1; i >= 0; i--) {
			var sheet = json[keys[i]];
			for (var j = sheet.length - 1; j > 0; j--) {
				var row = sheet[j];
				var keys = {};
				keys.name = sheet[0].indexOf('Name')
				keys.region = sheet[0].indexOf('Region')
				keys.year = sheet[0].indexOf('Year')
				keys.income = sheet[0].indexOf('Income')
				keys.population = sheet[0].indexOf('Population')
				var tmp = (checkindex(result, row[keys.name]));
				if (!tmp.check) {
					//does not have name property
					result.push({
						'Name': row[keys.name],
						'Region': row[keys.region],
						'Income': [
							[row[keys.year], row[keys.income]]
						],
						'Population': [
							[row[keys.year], row[keys.population]]
						]
					});
				} else {
					console.log(tmp, result[tmp.index], result[tmp.index]['Name'])
					result[tmp.index]['Income'].push([
						[row[keys.year], row[keys.income]]
					]);
					result[tmp.index]['Population'].push([
						[row[keys.year], row[keys.population]]
					]);
				}
			};
		}
		console.log(JSON.stringify(result));
	}

	var js = '{"1":[["Name","Region","Year","Income","Population"],["Angola","Sub-Saharan Africa","1800.0","100.0","10000.0"],["Angola","Sub-Saharan Africa","1820.0","200.0","15000.0"],["Angola","Sub-Saharan Africa","1840.0","300.0","20000.0"],["Angola","Sub-Saharan Africa","1880.0","400.0","25000.0"],["Angola","Sub-Saharan Africa","1900.0","500.0","30000.0"],["Angola","Sub-Saharan Africa","1920.0","600.0","35000.0"],["Angola","Sub-Saharan Africa","1940.0","700.0","40000.0"],["Benin","Sub-Saharan Africa","1800.0","500.0","200.0"],["Benin","Sub-Saharan Africa","1820.0","550.0","400.0"],["Benin","Sub-Saharan Africa","1840.0","600.0","450.0"],["Benin","Sub-Saharan Africa","1880.0","650.0","500.0"],["Benin","Sub-Saharan Africa","1900.0","700.0","6000.0"],["Benin","Sub-Saharan Africa","1920.0","750.0","70000.0"],["Benin","Sub-Saharan Africa","1940.0","800.0","80000.0"]]}';
	parse(js);