exports.index = function(req, res) {

	var config 	= require('../config'),
		request = require('request'),
		cheerio	= require('cheerio'),
		Q		= require('q');

	// create a version of request that returns promises
	var qRequest = Q.denodeify(request);

	function requestGithubProfiles(devs) {
		var promises = devs.map(function(dev) {
			return qRequest(config.url + dev);
		});

		// return a promise
		return Q.all(promises);
	};

	function scrapeAndMap(results) {
		var devs = results.map(function(y) {
			var $ 		= cheerio.load(y[0].body),
				name	= $('*[itemprop=additionalName]').text(),
				streak 	= $('.contrib-streak-current span.num').text().split(' ')[0];

			return {
				name: name,
				streak: streak
			};
		});

		devs.sort(function(x, y) {
			return x.streak < y.streak;
		});

		return devs;
	}

	// api for promise.then: .then(onFulfilled, onRejected, onProgress)
	requestGithubProfiles(config.devs)
		.then(scrapeAndMap)
		.done(function(devs) {
			res.render('index', {
				title: 'Highlander',
				devs: devs
			});
		});
};