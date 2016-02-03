var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
server.listen(3001);

io.of('/updateinfo').on('connection', function(socket) {
	console.log('New connection: ' + socket.id);
	socket.emit('UPDATE', {
		name : 'hello',
		message : 'world'
	});
});

console.log('Server running at http://127.0.0.1:3001/');
