import {Injectable} from 'angular2/core';
import {VideoConfiguration} from '../../angular-components/bl/bl';

@Injectable()
export class WebCameraGrabber {

    private getUserMedia: Function;
    private URL: any;
    private video: HTMLVideoElement;
    private detector: Detector.FLARMultiIdMarkerDetector;
    private screen: HTMLCanvasElement;
    private width: number = 640;
    private height: number = 480;

    constructor() {
        let nav = <any> navigator,
            win = <any> window;

        this.video = <HTMLVideoElement> document.querySelector('video');
        this.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
        this.URL = win.URL || win.webkitURL || win.mozURL || win.msURL;
        this.screen = <HTMLCanvasElement> document.getElementById('screen');

        let param: Detector.FLARParam = new FLARParam(this.width, this.height);
        this.detector = new FLARMultiIdMarkerDetector(param, 120);
        this.detector.setContinueMode(true);
    }

    public play() {
        if (this.getUserMedia) {
            this.getUserMedia.call(
                navigator,
                { video: true },
                (stream: Blob) => {
                    if ((<any>this.video).mozSrcObject !== undefined) {
                        (<any>this.video).mozSrcObject = stream;
                    } else {
                        this.video.src = (this.URL && this.URL.createObjectURL(stream)) || stream;
                    };
                    this.video.play();
                },
                () => Logger.error('Problem with streaming webcamera video.')
            );

        } else {
            Logger.error('Native web camera streaming (getUserMedia) not supported in this browser.');
        }
    }

    public getScreenFromVideo(): HTMLCanvasElement {
        this.screen.getContext('2d').drawImage(this.video, 0, 0, this.width, this.height);
        (<any>this.screen).changed = true;

        return this.screen;
    }

    public detectMarker(configuration: VideoConfiguration): NyARSquare {
        let raster: Detector.NyARRgbRaster_Canvas2D = new NyARRgbRaster_Canvas2D(this.getScreenFromVideo());
        let threshold = 70;
        let count: number = this.detector.detectMarkerLite(raster, threshold);
        while (configuration.thresholdChecked && count === 0 && threshold < 140) {
            threshold += configuration.threshold;
            count = this.detector.detectMarkerLite(raster, threshold);
        }
        let matrix: NyARSquare;
        if (count > 0) {
            matrix = this.detector.getSquare(0);
        }

        return matrix;
    }

}
