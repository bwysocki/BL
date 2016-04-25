"use strict";
var testing_1 = require('angular2/testing');
var web_camera_grabber_1 = require('../web-camera-grabber/web-camera-grabber');
var webgl_renderer_1 = require('./webgl-renderer');
testing_1.describe('Webgl renderer ', function () {
    'use strict';
    var webglRenderer;
    testing_1.beforeEachProviders(function () {
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        canvas.id = 'augmented-object';
        spyOn(document, 'getElementById').and.returnValue(canvas);
        THREE.WebGLRenderer = function () {
            return {
                render: function () { return undefined; }
            };
        };
        return [webgl_renderer_1.WebglRenderer, web_camera_grabber_1.WebCameraGrabber];
    });
    testing_1.beforeEach(testing_1.inject([webgl_renderer_1.WebglRenderer, web_camera_grabber_1.WebCameraGrabber], function (webglRendererService, webCameraGrabberService) {
        webglRenderer = webglRendererService;
    }));
    testing_1.it('is initialized.', function () {
        testing_1.expect(webglRenderer).not.toBeNull();
        testing_1.expect(webglRenderer.add3dObjectsAndRender).toBeDefined();
    });
    testing_1.it('is rendering in the loop.', function (done) {
        spyOn(webglRenderer, 'renderingFn').and.callFake(function () {
            done(); // has been called
        });
        webglRenderer.useConfiguration({
            fps: 30
        });
        webglRenderer.render();
    });
    /*it('finds angle between two points.', () => {
        expect(webglRenderer.findYAngle({ x: 3, y: 0 }, { x: 1, y: 3 })).toEqual(2.1003915839322564);
    });*/
});
