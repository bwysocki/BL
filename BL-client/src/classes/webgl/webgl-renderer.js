/// <reference path="../../../declarations/three.d.ts" />
var BLClient;
(function (BLClient) {
    class WebglRenderer {
        constructor(canvasId, videoGrabber) {
            this.uniqueName = 'bllogo';
            this.fps = 100;
            var canvas = document.getElementById(canvasId);
            this.videoGrabber = videoGrabber;
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this.camera.position.z = 2;
            this.object3d = new THREE.Object3D();
            this.scene.add(this.object3d);
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
            })(this.object3d, this.uniqueName));
        }
        render() {
            requestAnimationFrame((function (self, previousTime) {
                return function animate(now) {
                    requestAnimationFrame(animate);
                    var delta = now - previousTime;
                    if (delta > 1000 / self.fps) {
                        previousTime = now;
                        self.renderingFn();
                    }
                };
            })(this, performance.now()));
        }
        renderingFn() {
            this.videoGrabber.detectMarker();
            var deltaPlus = this.object3d.position.x + 1, deltaMinus = this.object3d.position.x - 1, right = true, move = 0.01;
            if (right) {
                if (this.object3d.position.x > deltaPlus) {
                    right = false;
                }
                this.object3d.position.x = this.object3d.position.x + move;
            }
            else {
                if (this.object3d.position.x < deltaMinus) {
                    right = true;
                }
                this.object3d.position.x = this.object3d.position.x - move;
            }
            this.renderer.render(this.scene, this.camera);
        }
    }
    BLClient.WebglRenderer = WebglRenderer;
})(BLClient || (BLClient = {}));
//# sourceMappingURL=webgl-renderer.js.map