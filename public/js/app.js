// * CLIENT JS

const getForecast = async (address, callback) => {
	const response = await fetch(
		`http://localhost:3000/weather?address=${encodeURIComponent(address)}`
	);
	const data = await response.json();
	if (data.error) {
		return callback(data.error, undefined);
	}
	callback(undefined, data);
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastMessage = document.getElementById('forecast');
const locationMessage = document.getElementById('location');
const errorMessage = document.getElementById('error');
const loadingMessage = document.getElementById('loading');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;

	// * CLEAN UP
	forecastMessage.innerText = '';
	locationMessage.innerText = '';

	//
	loadingMessage.innerText = 'Loading...';

	getForecast(location, (error, { forecast, location } = {}) => {
		loadingMessage.innerText = '';
		if (error) {
			errorMessage.innerText = error;
			setTimeout(() => {
				errorMessage.innerText = '';
			}, 3000);
		} else {
			forecastMessage.innerText = `${forecast.description}. Currently there are ${forecast.temp} degrees outside. It feels like ${forecast.feelslike} degrees.`;
			locationMessage.innerText = `Weather provided for: ${location}`;
		}
	});
});
