var express = require('express'),
	http	= require('http'),
	config	= require('./config'),
	routes	= require('./routes');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);

http.createServer(app).listen(config.port, function() {
	console.log('Listening on port ' + config.port);
});