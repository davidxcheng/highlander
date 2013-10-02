var express = require('express'),
	http	= require('http');

var app = express();

app.set('views', __dirname + '/views');
app.set('viewEngine', 'jade');
app.use(express.static(__dirname + '/public'))

http.createServer(app).listen('', function() {
	console.log('Listening on port ' + config.port);
});