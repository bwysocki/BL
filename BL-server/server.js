const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const amqp = require('amqp');
const config = require('config-node')();

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
	socket.emit('INIT', {
		fps: 20,
        model : 0,
        logoColor: "#7f7f7f",
        threshold: 15,
        thresholdChecked: false
	});
});

//rabbitMQ
const connection = amqp.createConnection({ 
  host: config.amqp.host,
  port: config.amqp.port,
  login: config.amqp.login,
  password: config.amqp.password,
  vhost: config.amqp.vhost
});

connection.on('ready', () => {
  console.log('Connection to AQMP established.');
  
  const blExchange = connection.exchange(config.amqp.exchange, {
    type: 'topic',
    durable: false,
    autoDelete: false  
  }, (exchange) => {
     console.log('Exchange ' + exchange.name + ' is open.');
  });

  // Use the default 'amq.topic' exchange
  connection.queue('my-queue', function (q) {
      q.subscribe(function (message) {
        // Print messages to stdout
        console.log(message);
      });
      
      q.bind(config.amqp.exchange, config.amqp.routingKey, function() {
	console.log('Exchange bound to queue.');
	//test	
	blExchange.publish(config.amqp.routingKey, { test: '1'}, {}, function() {
	
      	});
      });
      
  });
}, (e) => {
  console.log('Can not establish connection to AMQP', e);
});

console.log('Server running at http://127.0.0.1:3001/');

