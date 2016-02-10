/// <reference path="../../../declarations/three.d.ts" />
module BLClient {

    export class WebglRenderer {

        private _renderer: THREE.WebGLRenderer;
        private _scene: THREE.Scene;
        private _camera: THREE.PerspectiveCamera;
        private _object3d: THREE.Object3D;
        private _uniqueName: string = 'bllogo';

        constructor(canvasId: string) {

            var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvasId);

            this._renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });

            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this._camera.position.z = 2;
            this._object3d = new THREE.Object3D()
            this._scene.add(this._object3d);

        }

        add3dObject(modelUrl: string) {
            new THREE.TextureLoader().load(
                modelUrl, (function(object3d: THREE.Object3D, logoName: string) {
                    return function(texture: THREE.DataTexture) {
                        var material: THREE.SpriteMaterial = new THREE.SpriteMaterial({
                            map: texture,
                            color: 0xFF0000
                        }), geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1),
                            logo: THREE.Sprite = new THREE.Sprite(material);
                       	logo.name = logoName;
                        object3d.add(logo);
                    }
                })(this._object3d, this._uniqueName));
        }

        render() {
            var renderingFn = (function(object3d: THREE.Object3D, refreshFn: () => void) {
                return function() {
                    object3d.position.x = object3d.position.x + 0.01;
                    refreshFn();
                }
            })(this._object3d, (function(self: BLClient.WebglRenderer) {
                return function() {
                    self._refreshScene.call(self);
                }
            })(this));

            var fps = 30;
            var interval = 1000 / fps;
            var previousTime = performance.now()
            requestAnimationFrame(function animate(now) {
                var delta = now - previousTime;
                if (delta > interval) {
                    previousTime = now;
                    renderingFn();
                }
                requestAnimationFrame(animate);
            })
        }

        private _refreshScene() {
            this._renderer.render(this._scene, this._camera);
        }

    }

}