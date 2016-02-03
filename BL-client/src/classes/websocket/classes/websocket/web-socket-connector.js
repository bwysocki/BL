/// <reference path="../../interfaces/websocket.ts" />
var BLClient;
(function (BLClient) {
    var WebSocketConnector = (function () {
        function WebSocketConnector(url) {
            this._COMMAND = 'UPDATE';
            this._socket = io(url);
        }
        WebSocketConnector.prototype.listen = function () {
            this._socket.on(this._COMMAND, function (data) {
                console.log(data);
            });
        };
        return WebSocketConnector;
    })();
    BLClient.WebSocketConnector = WebSocketConnector;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=web-socket-connector.js.map