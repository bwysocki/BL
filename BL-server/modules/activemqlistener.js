const Stomp = require('stomp-client');
const config = require('config-node')();
const blEmitter = require('./blemitter.js');

const client = new Stomp(config.stomp.host, config.stomp.port);

exports.listen = (emitter) => {
  client.connect((sessionId) => {
    client.subscribe(config.stomp.queueName, function(body, headers) {
      emitter.emit(body);
    });
  });
}
