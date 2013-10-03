exports.index = function(req, res) {
	var devs = require('../config').devs;
	res.render('index', { 
		title: 'Highlander',
		devs: devs
	});
};