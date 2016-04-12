"use strict";
var testing_1 = require('angular2/testing');
var server_service_1 = require('./server-service');
testing_1.describe('Web socket server service ', function () {
    'use strict';
    var websocket;
    var mockServerResponse = function () {
        websocket.socket._callbacks.$INIT[0].call(websocket.socket, {
            fps: 20,
            model: 0,
            logoColor: '#7f7f7f',
            threshold: 15,
            thresholdChecked: false
        });
    };
    testing_1.beforeEach(function () {
        websocket = new server_service_1.ServerService();
    });
    testing_1.it('is initialized.', function () {
        testing_1.expect(websocket.socket).not.toBeNull();
    });
    testing_1.it('started listening.', function () {
        spyOn(websocket.socket, 'on');
        websocket.listen();
        testing_1.expect(websocket.socket.on).toHaveBeenCalled();
    });
    testing_1.it('returned promise after listening.', function () {
        testing_1.expect(websocket.listen()).toBePromise();
    });
    testing_1.it('returned configuration after promise fulfilled.', function (done) {
        var configurationPromise = websocket.listen();
        configurationPromise.then(function (conf) {
            testing_1.expect(conf).not.toBeUndefined();
            testing_1.expect(conf).not.toBeNull();
            testing_1.expect(conf.threshold).toEqual(15);
            done();
        });
        mockServerResponse();
    });
});
