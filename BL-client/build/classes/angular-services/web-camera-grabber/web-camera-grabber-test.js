"use strict";
var testing_1 = require('angular2/testing');
var web_camera_grabber_1 = require('./web-camera-grabber');
testing_1.describe('Web camera grabber ', function () {
    'use strict';
    var webCameraGrabber;
    testing_1.beforeEachProviders(function () { return [web_camera_grabber_1.WebCameraGrabber]; });
    testing_1.beforeEach(testing_1.injectAsync([web_camera_grabber_1.WebCameraGrabber], function (service) {
        webCameraGrabber = service;
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.addEventListener('load', function () {
                var canvas = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 480;
                canvas.getContext('2d').drawImage(img, 0, 0, 640, 480);
                canvas.changed = true;
                spyOn(webCameraGrabber, 'getScreenFromVideo').and.returnValue(canvas);
                resolve();
            }, false);
            img.src = 'base/src/classes/angular-services/web-camera-grabber/sample-video.png';
        });
    }));
    testing_1.it('is initialized.', function () {
        testing_1.expect(webCameraGrabber).not.toBeNull();
        testing_1.expect(webCameraGrabber.play).toBeDefined();
        testing_1.expect(webCameraGrabber.detectMarker).toBeDefined();
        testing_1.expect(webCameraGrabber.getScreenFromVideo).toBeDefined();
    });
    testing_1.it('for sample img, does not recognise marker with default threshold.', function () {
        testing_1.expect(webCameraGrabber.detectMarker({})).toBeUndefined();
    });
    testing_1.it('for sample img, does not recognise marker with disabled thresholdChecked.', function () {
        testing_1.expect(webCameraGrabber.detectMarker({ thresholdChecked: false })).toBeUndefined();
    });
    testing_1.it('for sample img, recognises marker with threshold.', function () {
        var marker = webCameraGrabber.detectMarker({ thresholdChecked: true, threshold: 30 });
        var coordinate = {};
        marker.getCenter2d(coordinate);
        testing_1.expect(coordinate.x).toEqual(280.1523712040181);
        testing_1.expect(coordinate.y).toEqual(162.1442600827492);
    });
});
