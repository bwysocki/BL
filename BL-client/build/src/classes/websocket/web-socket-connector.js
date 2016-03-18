System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WebSocketConnector;
    return {
        setters:[],
        execute: function() {
            WebSocketConnector = (function () {
                function WebSocketConnector(url) {
                    this.COMMAND = 'UPDATE';
                    this.socket = io(url);
                }
                WebSocketConnector.prototype.listen = function () {
                    this.socket.on(this.COMMAND, function (data) {
                        Logger.info(data);
                    });
                };
                return WebSocketConnector;
            }());
            exports_1("WebSocketConnector", WebSocketConnector);
        }
    }
});
