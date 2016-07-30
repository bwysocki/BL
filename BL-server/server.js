const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Stomp = require('stomp-client');
const config = require('config-node')();
const log = require('simple-node-logger').createSimpleLogger();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
console.log("Server is running on port 3001...")
server.listen(3001);

io.of('/updateinfo').on('connection', function(socket) {
	log.info('New connection: ' + socket.id);
	socket.emit('INIT', {
		fps: 20,
        model : 0,
        logoColor: "#7f7f7f",
        threshold: 15,
        thresholdChecked: false
	});
	
	//stomp
	const client = new Stomp(config.stomp.host, config.stomp.port);
	client.connect((sessionId) => {
		client.subscribe(config.stomp.queueName, function(body, headers) {
			log.info('Sending UPDATE msg');
			socket.emit('UPDATE', {
				fps: 20,
		        model : 1,
		        logoColor: "#7f7f7f",
		        threshold: 15,
		        thresholdChecked: false
			});
	    });
	});
});

