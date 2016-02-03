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
});
