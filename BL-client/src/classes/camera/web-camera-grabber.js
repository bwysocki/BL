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
//# sourceMappingURL=web-camera-grabber.js.map