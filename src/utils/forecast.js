request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"https://api.darksky.net/forecast/c5b8c25013ca001ce105feb3be484c3f/" +
		latitude +
		"," +
		longitude;

	request(
		{
			url,
			json: true
		},
		(error, { body }) => {
			error
				? callback(
						{
							error: "Unable to connect to weather services!"
						},
						undefined
				  )
				: body.error
				? callback("Unable to find location", undefined)
				: callback(
						undefined,
						body.daily.data[0].summary +
							" It is currently " +
							body.currently.temperature +
							" degrees out. There are " +
							body.currently.precipProbability +
							"% chances of raining."
				  );
		}
	);
};

module.exports = forecast;
