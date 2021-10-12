const request = require('postman-request');

const forecast = (lat, lng, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=7c411f54e14800e71fb0281ac634ecb7&query=${lat},${lng}`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback(
				'Unable to find the weather in specified location! Try another location!',
				undefined
			);
		} else {
			const data = {
				temp: body.current.temperature,
				feelslike: body.current.feelslike,
				description: body.current.weather_descriptions[0],
			};
			callback(undefined, data);
		}
	});
};

module.exports = forecast;
