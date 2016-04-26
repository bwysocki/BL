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
    testing_1.it('finds angle between two points.', function () {
        testing_1.expect(webglRenderer.findYAngle({ x: 3, y: 0 }, { x: 1, y: 3 })).toEqual(2.1003915839322564);
    });
    testing_1.it('updates position based on coordinates.', function () {
        var matrix = webglRenderer.updateObjectPositionWithMarker({ x: 3, y: 12 }, 2, 5);
        testing_1.expect(matrix.elements[12]).toEqual(2.0253124237060547);
        testing_1.expect(matrix.elements[13]).toEqual(4.900000095367432);
    });
    testing_1.it('updates rotation.', function () {
        var ob = new THREE.Object3D();
        webglRenderer.updateRotation(ob, { x: 3, y: 12 }, { x: 4, y: 14 });
        testing_1.expect(ob.matrix.elements[0]).toEqual(0.49866241216659546);
        testing_1.expect(ob.matrix.elements[1]).toEqual(0);
        testing_1.expect(ob.matrix.elements[2]).toEqual(-0.8667962551116943);
        testing_1.expect(ob.matrix.elements[3]).toEqual(0);
        testing_1.expect(ob.matrix.elements[4]).toEqual(0.13559681177139282);
        testing_1.expect(ob.matrix.elements[5]).toEqual(0.9876883625984192);
        testing_1.expect(ob.matrix.elements[6]).toEqual(0.07800798863172531);
        testing_1.expect(ob.matrix.elements[7]).toEqual(0);
        testing_1.expect(ob.matrix.elements[8]).toEqual(0.8561245799064636);
        testing_1.expect(ob.matrix.elements[9]).toEqual(-0.15643446147441864);
        testing_1.expect(ob.matrix.elements[10]).toEqual(0.49252307415008545);
        testing_1.expect(ob.matrix.elements[11]).toEqual(0);
        testing_1.expect(ob.matrix.elements[12]).toEqual(0);
        testing_1.expect(ob.matrix.elements[13]).toEqual(0);
        testing_1.expect(ob.matrix.elements[14]).toEqual(0);
        testing_1.expect(ob.matrix.elements[15]).toEqual(1);
    });
    testing_1.it('updates scale.', function () {
        testing_1.expect(webglRenderer.updateScale({
            sqvertex: [{ x: 0, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 7 }, { x: 1, y: 3 }]
        })).toEqual(0.0015590169943749475);
    });
});
