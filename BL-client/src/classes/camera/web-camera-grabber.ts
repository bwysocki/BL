///<reference path='../../../declarations/detector.d.ts'/>
///<reference path='../../../declarations/lodash.d.ts'/>
module BLClient {

    export class WebCameraGrabber {

        private getUserMedia: Function;
        private URL: any;
        private video: HTMLVideoElement;
        private myWorker = new Worker('test.js');
        private detector: Detector.FLARMultiIdMarkerDetector;

        constructor(video: HTMLVideoElement) {
            var nav = <any> navigator,
                win = <any> window;

            this.video = video;
            this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
            this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;

            var param: Detector.FLARParam = new FLARParam(640, 480);
            this.detector = new FLARMultiIdMarkerDetector(param, 80);
            this.detector.setContinueMode(true);
        }

        play() {
            if (this.getUserMedia) {
                this.getUserMedia.call(navigator, { video: true }, (function(video: any, url: any) {
                    return function(stream: Blob) {
                        if (video.mozSrcObject !== undefined) {
                            video.mozSrcObject = stream;
                        } else {
                            video.src = (url && url.createObjectURL(stream)) || stream;
                        };
                        video.play();
                    };
                })(this.video, this.URL), function() {
                    Logger.error('Problem with streaming webcamera video.');
                });
            } else {
                Logger.error('Native web camera streaming (getUserMedia) not supported in this browser.');
            }
        }

        detectMarker(): NyARSquare {
            var start: number = performance.now();

            var canvasElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('screen');
            canvasElement.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
            (<any>canvasElement).changed = true;

            var raster: Detector.NyARRgbRaster_Canvas2D = new NyARRgbRaster_Canvas2D(canvasElement);
            var count: number = this.detector.detectMarkerLite(raster, 170);

            var matrix: NyARSquare;
            if (count > 0) {
                matrix = this.detector.getSquare(0);
            }

            var end: number = performance.now();

            return matrix;
        }

    }
}