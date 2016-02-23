///<reference path='../../../declarations/detector.d.ts'/>
var BLClient;
(function (BLClient) {
    class WebCameraGrabber {
        constructor(video) {
            this.myWorker = new Worker('test.js');
            var nav = navigator, win = window;
            this.video = video;
            this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
            this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;
            //set up detector
            var param = new FLARParam(300, 200);
            this.detector = new FLARMultiIdMarkerDetector(param, 80);
            this.detector.setContinueMode(true);
        }
        play() {
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
        }
        detectMarker() {
            var start = performance.now();
            var canvasElement = document.getElementById('test');
            // document.createElement('canvas');
            canvasElement.getContext('2d').drawImage(this.video, 0, 0, 300, 200);
            canvasElement.changed = true;
            var raster = new NyARRgbRaster_Canvas2D(canvasElement);
            var markerCount = this.detector.detectMarkerLite(raster, 170);
            //console.log(markerCount);
            var end = performance.now();
            //console.log(end - start)
        }
    }
    BLClient.WebCameraGrabber = WebCameraGrabber;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=web-camera-grabber.js.map