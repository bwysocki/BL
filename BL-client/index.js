var express = require('express');
var app = express();

app.use('/bower_components', express.static('bower_components'));
app.use('/build', express.static('build'));
app.use('/index.html', express.static('src/index.html'));

app.listen(3000, function() {
	console.log('Client listening on port 3000');
});