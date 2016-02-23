var express = require('express'),
	fs = require('fs'),
	http2 = require('http2'),
	app = express(),
	options = {
		key: fs.readFileSync('./security/ca.key'),
		cert: fs.readFileSync('./security/ca.cert')
	};

app.use('/bower_components', express.static('bower_components'));
app.use('/build', express.static('build'));
app.use('/index.html', express.static('src/index.html'));

//http2.createServer(options, app).listen(3000);

http2.createServer(options, function(request, response) {
	response.end('Hello world!');
}).listen(3000);

/*app.listen(3000, function() {
	console.log('Client listening on port 3000');
});*/