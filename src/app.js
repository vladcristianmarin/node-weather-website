const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// * Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// * Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// * Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (_req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Vlad',
	});
});

app.get('/about', (_req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Vlad',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!',
		});
	}
	geocode(req.query.address, (error, { lat, lng, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(lat, lng, (error, { description, temp, feelslike } = {}) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: { description, temp, feelslike },
				location,
				address: req.query.address,
			});
		});
	});
});

app.get('/help', (_req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'Vlad',
		message: 'Get useful info from the help page!',
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Vlad',
		errorMessage: 'Help article not found!',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404!',
		name: 'Vlad',
		errorMessage: 'Page not found!',
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});
