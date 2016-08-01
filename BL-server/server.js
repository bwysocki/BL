const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Stomp = require('stomp-client');
const config = require('config-node')();
const log = require('simple-node-logger').createSimpleLogger();
const EventEmitter = require('events');

class QueueEmitter extends EventEmitter {}
const queueEmitter = new QueueEmitter();

//cors
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

//server
server.listen(3001);

console.log("Server is running on port 3001...");

//stomp listener
const client = new Stomp(config.stomp.host, config.stomp.port);	
client.connect((sessionId) => {
	client.subscribe(config.stomp.queueName, function(body, headers) {
		console.log("body", body, headers)
		queueEmitter.emit('queueMsg', body);
	});
});

io.of('/updateinfo').on('connection', function(socket) {
	log.info('New connection: ' + socket.id);
	socket.emit('INIT', {
		fps: 20,
        model : 0,
        logoColor: "#7f7f7f",
        threshold: 15,
        thresholdChecked: false
	});
	
	let queueMsgCallback = (msg) => {
		log.info('Sending UPDATE msg');
		let configuration = JSON.parse(msg);
		configuration.model = configuration.model === 'CAR' ? 0 : 1;
		socket.emit('UPDATE', configuration);
	}
	
	queueEmitter.on('queueMsg', queueMsgCallback);
	
	socket.on('disconnect', function() {
		log.info('Connection: ' + socket.id + ' disconnected.');
		queueEmitter.removeListener('queueMsg', queueMsgCallback);
    });
});

