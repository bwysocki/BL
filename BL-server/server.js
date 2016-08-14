const log = require('simple-node-logger').createSimpleLogger();
const websocketserver = require('./modules/websocketserver.js');
const blEmitter = require('./modules/blemitter.js');
const activemqlistener = require('./modules/activemqlistener.js');
const mongoreader = require('./modules/mongoreader.js');

const server = websocketserver.startWebsocketServer();
const emitter = blEmitter.getBlEmitter();

activemqlistener.listen(emitter);

server.of('/updateinfo').on('connection', function(socket) {
	log.info('New connection: ' + socket.id);

	//emit by websocket initial configuration
	mongoreader.getConfigurationPromise().then(configuration => socket.emit('INIT', configuration));

	//callback for activemq message
	let queueMsgCallback = (msg) => {
		log.info('Sending UPDATE msg');
		let configuration = JSON.parse(msg);
		configuration.model = configuration.model === 'CAR' ? 0 : 1;
		socket.emit('UPDATE', configuration);
	}

	emitter.on(queueMsgCallback);

	socket.on('disconnect', function() {
		log.info('Connection: ' + socket.id + ' disconnected.');
		emitter.removeListener(queueMsgCallback);
    });
});
