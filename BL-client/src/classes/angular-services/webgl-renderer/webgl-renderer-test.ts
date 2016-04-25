import {beforeEach, describe, expect, it, beforeEachProviders, inject} from 'angular2/testing';
import {WebCameraGrabber} from '../web-camera-grabber/web-camera-grabber';
import {WebglRenderer} from './webgl-renderer';

describe('Webgl renderer ', () => {
    'use strict';

    let webglRenderer: WebglRenderer;

    beforeEachProviders(() => {
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        canvas.id = 'augmented-object';
        spyOn(document, 'getElementById').and.returnValue(canvas);

        (<any>THREE).WebGLRenderer = function() {
            return {
                render : () => undefined
            };
        };

        return [WebglRenderer, WebCameraGrabber];
    });

    beforeEach(inject([WebglRenderer, WebCameraGrabber], (webglRendererService, webCameraGrabberService) => {
        webglRenderer = webglRendererService;
    }));

    it('is initialized.', () => {
        expect(webglRenderer).not.toBeNull();
        expect(webglRenderer.add3dObjectsAndRender).toBeDefined();
    });

    it('is rendering in the loop.', (done) => {
        spyOn(webglRenderer, 'renderingFn').and.callFake(() => {
            done(); // has been called
        });
        webglRenderer.useConfiguration({
            fps: 30
        });
        webglRenderer.render();
    });

    it('finds angle between two points.', () => {
        expect(webglRenderer.findYAngle({ x: 3, y: 0 }, { x: 1, y: 3 })).toEqual(2.1003915839322564);
    });

    it('updates position based on coordinates.', () => {
        let matrix: THREE.Matrix4 = webglRenderer.updateObjectPositionWithMarker({ x: 3, y: 12 }, 2 , 5);
        expect(matrix.elements[12]).toEqual(2.0253124237060547);
        expect(matrix.elements[13]).toEqual(4.900000095367432);
    });

    it('updates rotation.', () => {
        let ob = new THREE.Object3D();
        webglRenderer.updateRotation(ob, { x: 3, y: 12 }, { x: 4, y: 14 });
        expect(ob.matrix.elements[0]).toEqual(0.49866241216659546);
        expect(ob.matrix.elements[1]).toEqual(0);
        expect(ob.matrix.elements[2]).toEqual(-0.8667962551116943);
        expect(ob.matrix.elements[3]).toEqual(0);
        expect(ob.matrix.elements[4]).toEqual(0.13559681177139282);
        expect(ob.matrix.elements[5]).toEqual(0.9876883625984192);
        expect(ob.matrix.elements[6]).toEqual(0.07800798863172531);
        expect(ob.matrix.elements[7]).toEqual(0);
        expect(ob.matrix.elements[8]).toEqual(0.8561245799064636);
        expect(ob.matrix.elements[9]).toEqual(-0.15643446147441864);
        expect(ob.matrix.elements[10]).toEqual(0.49252307415008545);
        expect(ob.matrix.elements[11]).toEqual(0);
        expect(ob.matrix.elements[12]).toEqual(0);
        expect(ob.matrix.elements[13]).toEqual(0);
        expect(ob.matrix.elements[14]).toEqual(0);
        expect(ob.matrix.elements[15]).toEqual(1);
    });

    it('updates scale.', () => {
        expect(webglRenderer.updateScale(<NyARSquare>{
            sqvertex : [{x: 0, y: 5}, {x: 2, y: 6}, {x: 3, y: 7}, {x: 1, y: 3}]
        })).toEqual(0.0015590169943749475);
    });

});
