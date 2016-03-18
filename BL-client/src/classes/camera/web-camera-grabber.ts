export class WebCameraGrabber {

    private getUserMedia: Function;
    private URL: any;
    private video: HTMLVideoElement;
    private detector: Detector.FLARMultiIdMarkerDetector;
    private screen: HTMLCanvasElement;

    constructor(video: HTMLVideoElement) {
        let nav = <any> navigator,
            win = <any> window;

        this.video = video;
        this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
        this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;
        this.screen = <HTMLCanvasElement> document.getElementById('screen');

        let param: Detector.FLARParam = new FLARParam(640, 480);
        this.detector = new FLARMultiIdMarkerDetector(param, 80); // 120
        this.detector.setContinueMode(true);
    }

    public play() {
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

    public detectMarker(): NyARSquare {

        this.screen.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
        (<any>this.screen).changed = true;

        let raster: Detector.NyARRgbRaster_Canvas2D = new NyARRgbRaster_Canvas2D(this.screen);
        let count: number = this.detector.detectMarkerLite(raster, 170); // 70
        let matrix: NyARSquare;
        if (count > 0) {
            matrix = this.detector.getSquare(0);
        }


        return matrix;
    }

}
