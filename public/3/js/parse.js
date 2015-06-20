var parse = function (json) {
	json = JSON.parse(json) || json;
	var result = []
	for (var i = json.length - 1; i >= 0; i--) {
			if(i == 0){
				result[json[i]]
			} else {
			for (var j = json[i].length - 1; j >= 0; j--) {
				json[i][j]
			};
		}
	};
}