System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WebCameraGrabber;
    return {
        setters:[],
        execute: function() {
            WebCameraGrabber = (function () {
                function WebCameraGrabber(video) {
                    var nav = navigator, win = window;
                    this.video = video;
                    this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
                    this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;
                    this.screen = document.getElementById('screen');
                    var param = new FLARParam(640, 480);
                    this.detector = new FLARMultiIdMarkerDetector(param, 120);
                    this.detector.setContinueMode(true);
                }
                WebCameraGrabber.prototype.play = function () {
                    var _this = this;
                    if (this.getUserMedia) {
                        this.getUserMedia.call(navigator, { video: true }, function (stream) {
                            if (_this.video.mozSrcObject !== undefined) {
                                _this.video.mozSrcObject = stream;
                            }
                            else {
                                _this.video.src = (_this.URL && _this.URL.createObjectURL(stream)) || stream;
                            }
                            ;
                            _this.video.play();
                        }, function () { return Logger.error('Problem with streaming webcamera video.'); });
                    }
                    else {
                        Logger.error('Native web camera streaming (getUserMedia) not supported in this browser.');
                    }
                };
                WebCameraGrabber.prototype.detectMarker = function () {
                    this.screen.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
                    this.screen.changed = true;
                    var raster = new NyARRgbRaster_Canvas2D(this.screen);
                    var count = this.detector.detectMarkerLite(raster, 70); // 70
                    var matrix;
                    if (count > 0) {
                        matrix = this.detector.getSquare(0);
                    }
                    return matrix;
                };
                return WebCameraGrabber;
            }());
            exports_1("WebCameraGrabber", WebCameraGrabber);
        }
    }
});
