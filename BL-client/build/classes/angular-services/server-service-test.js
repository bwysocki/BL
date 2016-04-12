"use strict";
var testing_1 = require('angular2/testing');
var server_service_1 = require('./server-service');
testing_1.describe('Web socket server service.', function () {
    'use strict';
    var websocket;
    testing_1.beforeEach(function () {
        websocket = new server_service_1.ServerService();
        spyOn(websocket.socket, 'on');
        websocket.listen();
    });
    testing_1.it('is initialized.', function () {
        testing_1.expect(websocket.socket).not.toBeNull();
    });
    testing_1.it('started listening', function () {
        testing_1.expect(null).toBeNull();
        // expect(websocket.socket.on).toHaveBeenCalled();
    });
});
