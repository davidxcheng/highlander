exports.index = function(req, res) {

	var config 	= require('../config'),
		request = require('request'),
		cheerio	= require('cheerio'),
		q		= require('q');

	var getStreak = function(username) {
		request(config.url + username, function(err, resp, html) {
			var $ = cheerio.load(html);
			console.log($('.contrib-streak-current span.num').text());
			return $('.contrib-streak-current span.num').text();
		});
	};

	var devs = config.devs.map(function(name) {
		var streak = getStreak(name);
		return {
			name: name,
			streak: streak
		};
	});

	console.log(devs);

	res.render('index', { 
		title: 'Highlander',
		devs: devs
	});
};