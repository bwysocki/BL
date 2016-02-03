module BLClient {

    export class WebCameraGrabber {

        private _getUserMedia: Function;
        private _URL: any;
        private _video: Element;

        constructor(video: Element) {
            var _navigator = <any> navigator,
                _window = <any> window;

            this._video = video;
            this._getUserMedia = _navigator.getUserMedia || _navigator.webkitGetUserMedia || _navigator.mozGetUserMedia || _navigator.msGetUserMedia;
            this._URL = _window.URL || _window.webkitURL || _window.mozURL || _window.msURL;
        }

        play() {
            if (this._getUserMedia) {
                this._getUserMedia.call(navigator, { video: true }, (function(video: any, url: any) {
                    return function(stream: Blob) {
                        if (video.mozSrcObject !== undefined) {
                            video.mozSrcObject = stream;
                        } else {
                            video.src = (url && url.createObjectURL(stream)) || stream;
                        };
                        video.play();
                    };
                })(this._video, this._URL), function() {
                    console.log('Problem with streaming webcamera video.');
                });
            } else {
                console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
            }
        }
    }
}