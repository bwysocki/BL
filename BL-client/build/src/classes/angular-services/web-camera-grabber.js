"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var WebCameraGrabber = (function () {
    function WebCameraGrabber() {
        var nav = navigator, win = window;
        this.video = document.querySelector('video');
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
    WebCameraGrabber.prototype.detectMarker = function (configuration) {
        this.screen.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
        this.screen.changed = true;
        var raster = new NyARRgbRaster_Canvas2D(this.screen);
        var threshold = 70;
        var count = this.detector.detectMarkerLite(raster, threshold);
        while (configuration.thresholdChecked && count === 0 && threshold < 255) {
            threshold += configuration.threshold;
            count = this.detector.detectMarkerLite(raster, threshold);
        }
        var matrix;
        if (count > 0) {
            matrix = this.detector.getSquare(0);
        }
        return matrix;
    };
    WebCameraGrabber = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WebCameraGrabber);
    return WebCameraGrabber;
}());
exports.WebCameraGrabber = WebCameraGrabber;
