"use strict";
var testing_1 = require('angular2/testing');
var web_camera_grabber_1 = require('./web-camera-grabber');
testing_1.describe('Web camera grabber ', function () {
    'use strict';
    var webCameraGrabber;
    testing_1.beforeEachProviders(function () { return [web_camera_grabber_1.WebCameraGrabber]; });
    testing_1.beforeEach(testing_1.inject([web_camera_grabber_1.WebCameraGrabber], function (service) {
        webCameraGrabber = service;
    }));
    testing_1.it('is initialized.', function () {
        testing_1.expect(webCameraGrabber).not.toBeNull();
        testing_1.expect(webCameraGrabber.play).toBeDefined();
        testing_1.expect(webCameraGrabber.detectMarker).toBeDefined();
    });
    testing_1.it('started playing.', function () {
        console.log(webCameraGrabber.video);
        webCameraGrabber.play();
    });
});
