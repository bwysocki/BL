/// <reference path="../../../declarations/three.d.ts" />
var BLClient;
(function (BLClient) {
    class WebglRenderer {
        constructor(canvasId) {
            this._uniqueName = 'bllogo';
            var canvas = document.getElementById(canvasId);
            this._renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this._camera.position.z = 2;
            this._object3d = new THREE.Object3D();
            this._scene.add(this._object3d);
        }
        add3dObject(modelUrl) {
            new THREE.TextureLoader().load(modelUrl, (function (object3d, logoName) {
                return function (texture) {
                    var material = new THREE.SpriteMaterial({
                        map: texture,
                        color: 0xFF0000
                    }), geometry = new THREE.BoxGeometry(1, 1, 1), logo = new THREE.Sprite(material);
                    logo.name = logoName;
                    object3d.add(logo);
                };
            })(this._object3d, this._uniqueName));
        }
        render() {
            var renderingFn = (function (object3d, refreshFn) {
                return function () {
                    object3d.position.x = object3d.position.x + 0.01;
                    refreshFn();
                };
            })(this._object3d, (function (self) {
                return function () {
                    self._refreshScene.call(self);
                };
            })(this));
            var fps = 30;
            var interval = 1000 / fps;
            var previousTime = performance.now();
            requestAnimationFrame(function animate(now) {
                var delta = now - previousTime;
                if (delta > interval) {
                    previousTime = now;
                    renderingFn();
                }
                requestAnimationFrame(animate);
            });
        }
        _refreshScene() {
            this._renderer.render(this._scene, this._camera);
        }
    }
    BLClient.WebglRenderer = WebglRenderer;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=webgl-renderer.js.map