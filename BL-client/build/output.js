///<reference path='../../../declarations/detector.d.ts'/>
///<reference path='../../../declarations/lodash.d.ts'/>
var BLClient;
(function (BLClient) {
    var WebCameraGrabber = (function () {
        function WebCameraGrabber(video) {
            this.myWorker = new Worker('test.js');
            var nav = navigator, win = window;
            this.video = video;
            this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
            this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;
            var param = new FLARParam(640, 480);
            this.detector = new FLARMultiIdMarkerDetector(param, 80);
            this.detector.setContinueMode(true);
        }
        WebCameraGrabber.prototype.play = function () {
            if (this.getUserMedia) {
                this.getUserMedia.call(navigator, { video: true }, (function (video, url) {
                    return function (stream) {
                        if (video.mozSrcObject !== undefined) {
                            video.mozSrcObject = stream;
                        }
                        else {
                            video.src = (url && url.createObjectURL(stream)) || stream;
                        }
                        ;
                        video.play();
                    };
                })(this.video, this.URL), function () {
                    Logger.error('Problem with streaming webcamera video.');
                });
            }
            else {
                Logger.error('Native web camera streaming (getUserMedia) not supported in this browser.');
            }
        };
        WebCameraGrabber.prototype.detectMarker = function () {
            var start = performance.now();
            var canvasElement = document.getElementById('screen');
            canvasElement.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
            canvasElement.changed = true;
            var raster = new NyARRgbRaster_Canvas2D(canvasElement);
            var count = this.detector.detectMarkerLite(raster, 170);
            var matrix;
            if (count > 0) {
                matrix = this.detector.getSquare(0);
            }
            var end = performance.now();
            return matrix;
        };
        return WebCameraGrabber;
    })();
    BLClient.WebCameraGrabber = WebCameraGrabber;
})(BLClient || (BLClient = {}));
///<reference path='../../../declarations/blclient.d.ts'/>
var BLClient;
(function (BLClient) {
    var WebSocketConnector = (function () {
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
    })();
    BLClient.WebSocketConnector = WebSocketConnector;
})(BLClient || (BLClient = {}));
///<reference path='../declarations/logger.d.ts'/>
///<reference path='classes/camera/web-camera-grabber.ts'/>
///<reference path='classes/websocket/web-socket-connector.ts'/>
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Logger.useDefaults();
    //set up video
    var video = document.querySelector('video');
    var videoGrabber = new BLClient.WebCameraGrabber(video);
    videoGrabber.play();
    //start listening
    var websocket = new BLClient.WebSocketConnector('http://localhost:3001/updateinfo');
    websocket.listen();
    //start presenting
    var webglrenderer = new BLClient.WebglRenderer('augmented-object', videoGrabber);
    webglrenderer.add3dObject('/img/logo.json');
    webglrenderer.render();
});
/// <reference path="../../../declarations/three.d.ts" />
/// <reference path='../../../declarations/lodash.d.ts'/>
/// <reference path='../../../declarations/detector.d.ts'/>
var BLClient;
(function (BLClient) {
    var WebglRenderer = (function () {
        function WebglRenderer(canvasId, videoGrabber) {
            this.fps = 30;
            var canvas = document.getElementById(canvasId);
            this.videoGrabber = videoGrabber;
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this.camera.position.z = 5;
            this.object3d = new THREE.Object3D();
            this.scene.add(this.object3d);
            this.addLight();
        }
        WebglRenderer.prototype.add3dObject = function (modelUrl) {
            new THREE.JSONLoader().load(modelUrl, (function (self) {
                return function (geometry, materials) {
                    var loader = new THREE.TextureLoader();
                    loader.load('/img/textures/gtare.jpg', function (texture) {
                        var material = new THREE.MeshLambertMaterial({
                            map: texture
                        });
                        self.mesh = new THREE.Mesh(geometry, material);
                        self.mesh.rotation.y = -Math.PI / 5;
                        self.object3d.add(self.mesh);
                    });
                };
            })(this));
        };
        WebglRenderer.prototype.render = function () {
            requestAnimationFrame((function (self, previousTime) {
                return function animate(now) {
                    requestAnimationFrame(animate);
                    var delta = now - previousTime;
                    if (delta > 1000 / self.fps) {
                        previousTime = now;
                        self.renderingFn();
                    }
                };
            })(this, performance.now()));
        };
        WebglRenderer.prototype.renderingFn = function () {
            var marker = this.videoGrabber.detectMarker();
            if (!_.isUndefined(marker)) {
                var coordinate = {};
                marker.getCenter2d(coordinate);
                var dx = -2.25 + (10.8 * coordinate.x / 640.0);
                var dy = 1.8 - (8.0 * coordinate.y / 480.0);
                //dx = -3.0 + (5.4 * coordinate.x / 640.0);
                //dy = 1.2 - (4.0 * coordinate.y / 480.0);
                var matrix = new THREE.Matrix4();
                matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
                this.object3d.matrixAutoUpdate = false;
                this.object3d.matrix.makeRotationX(Math.PI / 10);
                this.object3d.matrix.copyPosition(matrix);
                var scale = 0.009 +
                    Math.sqrt(Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                        Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2)) / 5000;
                this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;
            }
            this.renderer.render(this.scene, this.camera);
        };
        WebglRenderer.prototype.addLight = function () {
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 100, 60);
            light.castShadow = true;
            light.shadow.camera.left = -60;
            light.shadow.camera.top = -60;
            light.shadow.camera.right = 60;
            light.shadow.camera.bottom = 60;
            light.shadow.camera.near = 1;
            light.shadow.camera.far = 1000;
            light.shadow.bias = -.0001;
            light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
            this.scene.add(light);
        };
        return WebglRenderer;
    })();
    BLClient.WebglRenderer = WebglRenderer;
})(BLClient || (BLClient = {}));
