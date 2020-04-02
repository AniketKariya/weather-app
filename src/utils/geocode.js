const request = require("request");

const geocode = (address, callback) => {
	const token =
		"pk.eyJ1IjoiYW5pa2V0a2FyaXlhIiwiYSI6ImNrOGc5bmdtNDA5OTczaW1saXFqb2wxMXoifQ.vRekoEbatIZipuV2PLMbkg";
	const gecodeURL =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		address +
		".json?access_token=" +
		token;

	request(
		{
			url: gecodeURL,
			json: true
		},
		(error, { body } = {}) => {
			error
				? callback(
						{
							error: "Unable to connect to location services!"
						},
						undefined
				  )
				: body.features.length
				? callback(undefined, {
						longitude: body.features[0].center[0],
						latitude: body.features[0].center[1],
						location: body.features[0].place_name
				  })
				: callback(
						{
							error: "Invalid location"
						},
						undefined
				  );
		}
	);
};

module.exports = geocode;
