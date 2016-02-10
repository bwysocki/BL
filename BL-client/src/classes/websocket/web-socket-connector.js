/// <reference path="../../interfaces/websocket.ts" />
var BLClient;
(function (BLClient) {
    class WebSocketConnector {
        constructor(url) {
            this._COMMAND = 'UPDATE';
            this._socket = io(url);
        }
        listen() {
            this._socket.on(this._COMMAND, function (data) {
                console.log(data);
            });
        }
    }
    BLClient.WebSocketConnector = WebSocketConnector;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=web-socket-connector.js.map