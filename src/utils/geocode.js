const request = require('postman-request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiZGFya2tlZXBlcjE2IiwiYSI6ImNrdWp6dnE0aTEydG0ycG42dTltbXB6bTEifQ.r_Uvj7cwqA9LC7X31WCbbA`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (!body.features || body.features.length === 0) {
			callback(
				'Unable to find the specified location! Try another search.',
				undefined
			);
		} else {
			const data = {
				lat: body.features[0].center[1],
				lng: body.features[0].center[0],
				location: body.features[0].place_name,
			};
			callback(undefined, data);
		}
	});
};

module.exports = geocode;
