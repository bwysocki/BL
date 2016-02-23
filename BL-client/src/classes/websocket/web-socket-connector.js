///<reference path='../../../declarations/websocket.d.ts'/>
var BLClient;
(function (BLClient) {
    class WebSocketConnector {
        constructor(url) {
            this.COMMAND = 'UPDATE';
            this.socket = io(url);
        }
        listen() {
            this.socket.on(this.COMMAND, function (data) {
                Logger.info(data);
            });
        }
    }
    BLClient.WebSocketConnector = WebSocketConnector;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=web-socket-connector.js.map