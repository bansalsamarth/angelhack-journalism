$(function () {
	var locationField = $("#location");

	console.log(locationField);

	locationField.keypress(function(e) {
		console.log("Key pressed");
		if(e.which == 13) {
			var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $('#location').val();
			$.ajax(url)
			.done(function(data) {
				var lat = data.results[0].geometry.location.lat;
				var lon = data.results[0].geometry.location.lng;
				console.log(lat + " " + lon);
				$('#lat').val(lat);
				$('#lon').val(lon);
				console.log($("#targetForm"));
				$("form").submit();
			});
		}
	});
});