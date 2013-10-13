exports.index = function(req, res) {

	var config 	= require('../config'),
		request = require('request'),
		cheerio	= require('cheerio'),
		Q		= require('q');

	var qRequest = Q.denodeify(request);

	function map(arr, iterator) {
		var promises = arr.map(function(el) { 
			return iterator(config.url + el);
		});

		// return a promise
		return Q.all(promises);
	};

	// api for promise.then: .then(onFulfilled, onRejected, onProgress)
	map(config.devs, qRequest)
		.then(function(results) { 
			var devs = results.map(function(y) {
				var $ 		= cheerio.load(y[0].body);
				var name	= $('*[itemprop=additionalName]').text(),
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
		})
		.done(function(devs) {
			res.render('index', { 
				title: 'Highlander',
				devs: devs
			});
		});
};