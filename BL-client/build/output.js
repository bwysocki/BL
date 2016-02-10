var BLClient;
(function (BLClient) {
    var WebCameraGrabber = (function () {
        function WebCameraGrabber(video) {
            var _navigator = navigator, _window = window;
            this._video = video;
            this._getUserMedia = _navigator.getUserMedia || _navigator.webkitGetUserMedia || _navigator.mozGetUserMedia || _navigator.msGetUserMedia;
            this._URL = _window.URL || _window.webkitURL || _window.mozURL || _window.msURL;
        }
        WebCameraGrabber.prototype.play = function () {
            if (this._getUserMedia) {
                this._getUserMedia.call(navigator, { video: true }, (function (video, url) {
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
                })(this._video, this._URL), function () {
                    console.log('Problem with streaming webcamera video.');
                });
            }
            else {
                console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
            }
        };
        return WebCameraGrabber;
    })();
    BLClient.WebCameraGrabber = WebCameraGrabber;
})(BLClient || (BLClient = {}));
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
///<reference path='classes/camera/web-camera-grabber.ts'/>
///<reference path='classes/websocket/web-socket-connector.ts'/>
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //set up video
    var video = document.querySelector('video');
    var videoGrabber = new BLClient.WebCameraGrabber(video);
    videoGrabber.play();
    //start listening
    var websocket = new BLClient.WebSocketConnector("http://localhost:3001/updateinfo");
    websocket.listen();
    //start presenting
    var webglrenderer = new BLClient.WebglRenderer("augmented-object");
    webglrenderer.add3dObject('/img/logo.png');
    webglrenderer.render();
});
/// <reference path="../../../declarations/three.d.ts" />
var BLClient;
(function (BLClient) {
    var WebglRenderer = (function () {
        function WebglRenderer(canvasId) {
            this._uniqueName = 'bllogo';
            var canvas = document.getElementById(canvasId);
            this._renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this._camera.position.z = 2;
            this._object3d = new THREE.Object3D();
            this._scene.add(this._object3d);
        }
        WebglRenderer.prototype.add3dObject = function (modelUrl) {
            new THREE.TextureLoader().load(modelUrl, (function (object3d, logoName) {
                return function (texture) {
                    var material = new THREE.SpriteMaterial({
                        map: texture,
                        color: 0xFF0000
                    }), geometry = new THREE.BoxGeometry(1, 1, 1), logo = new THREE.Sprite(material);
                    logo.name = logoName;
                    object3d.add(logo);
                };
            })(this._object3d, this._uniqueName));
        };
        WebglRenderer.prototype.render = function () {
            var renderingFn = (function (object3d, refreshFn) {
                return function () {
                    object3d.position.x = object3d.position.x + 0.01;
                    refreshFn();
                };
            })(this._object3d, (function (self) {
                return function () {
                    self._refreshScene.call(self);
                };
            })(this));
            var fps = 30;
            var interval = 1000 / fps;
            var previousTime = performance.now();
            requestAnimationFrame(function animate(now) {
                var delta = now - previousTime;
                if (delta > interval) {
                    previousTime = now;
                    renderingFn();
                }
                requestAnimationFrame(animate);
            });
        };
        WebglRenderer.prototype._refreshScene = function () {
            this._renderer.render(this._scene, this._camera);
        };
        return WebglRenderer;
    })();
    BLClient.WebglRenderer = WebglRenderer;
})(BLClient || (BLClient = {}));
