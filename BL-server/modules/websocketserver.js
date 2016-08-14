const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const log = require('simple-node-logger').createSimpleLogger();

exports.startWebsocketServer = () => {
  //set up CORS headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  //start server
  server.listen(3001);
  log.info("Server is running on port 3001...");

  return io;
};
