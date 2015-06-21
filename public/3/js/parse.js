	  $('#button').click(function(event) {
		event.preventDefault();
        $($('#uploadForm')).ajaxSubmit({

            error: function(xhr) {
                    console.log('Error: ' + xhr.status);
            },

            success: function(response) {
                      console.log(parse(response));
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
					result[tmp.index]['Income'].push([
						[row[keys.year], row[keys.income]]
					]);
					result[tmp.index]['Population'].push([
						[row[keys.year], row[keys.population]]
					]);
				}
			};
		}
		return result;
	}