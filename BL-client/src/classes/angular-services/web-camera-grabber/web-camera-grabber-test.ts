import {beforeEach, describe, expect, it, beforeEachProviders, injectAsync} from 'angular2/testing';
import {WebCameraGrabber} from './web-camera-grabber';

describe('Web camera grabber ', () => {
    'use strict';

    let webCameraGrabber: WebCameraGrabber;

    beforeEachProviders(() => [WebCameraGrabber]);

    beforeEach(injectAsync([WebCameraGrabber], (service) => {
        webCameraGrabber = service;
        return new Promise((resolve, reject) => {
            let img: HTMLImageElement = document.createElement('img');
            img.addEventListener('load', function() {
                let canvas: HTMLCanvasElement = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 480;
                canvas.getContext('2d').drawImage(img, 0, 0, 640, 480);
                (<any>canvas).changed = true;
                spyOn(webCameraGrabber, 'getScreenFromVideo').and.returnValue(canvas);
                resolve();
            }, false);
            img.src = 'base/src/classes/angular-services/web-camera-grabber/sample-video.png';
        });
    }));

    it('is initialized.', () => {
        expect(webCameraGrabber).not.toBeNull();
        expect(webCameraGrabber.play).toBeDefined();
        expect(webCameraGrabber.detectMarker).toBeDefined();
        expect(webCameraGrabber.getScreenFromVideo).toBeDefined();
    });

    it('for sample img, does not recognise marker with default threshold.', () => {
        expect(webCameraGrabber.detectMarker({})).toBeUndefined();
    });

    it('for sample img, does not recognise marker with disabled thresholdChecked.', () => {
        expect(webCameraGrabber.detectMarker({ thresholdChecked: false })).toBeUndefined();
    });

    it('for sample img, recognises marker with threshold.', () => {
        const marker: NyARSquare = webCameraGrabber.detectMarker({ thresholdChecked: true, threshold: 30 });
        let coordinate: Coordinate = {};
        marker.getCenter2d(coordinate);
        expect(coordinate.x).toEqual(280.1523712040181);
        expect(coordinate.y).toEqual(162.1442600827492);
    });

});
