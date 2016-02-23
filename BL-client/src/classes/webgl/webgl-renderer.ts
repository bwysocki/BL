/// <reference path="../../../declarations/three.d.ts" />
/// <reference path='../../../declarations/lodash.d.ts'/>
/// <reference path='../../../declarations/detector.d.ts'/>
module BLClient {

    export class WebglRenderer {

        private renderer: THREE.WebGLRenderer;
        private videoGrabber: BLClient.WebCameraGrabber;
        private scene: THREE.Scene;
        private camera: THREE.PerspectiveCamera;
        private object3d: THREE.Object3D;
        private fps: number = 30;
        private mesh: THREE.Mesh;

        constructor(canvasId: string, videoGrabber: BLClient.WebCameraGrabber) {

            var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvasId);

            this.videoGrabber = videoGrabber;
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this.camera.position.z = 5;
            this.object3d = new THREE.Object3D();
            this.scene.add(this.object3d);

            this.addLight();
        }

        add3dObject(modelUrl: string) {
            new THREE.JSONLoader().load(
                modelUrl, (function(self: BLClient.WebglRenderer) {
                    return function(geometry: THREE.Geometry, materials: THREE.Material[]) {

                        var loader: THREE.TextureLoader = new THREE.TextureLoader();
                        loader.load(
                            '/img/textures/gtare.jpg',
                            function(texture: THREE.Texture) {
                                var material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
                                    map: texture
                                });

                                self.mesh = new THREE.Mesh(
                                    geometry,
                                    material
                                    );
                                self.mesh.rotation.y = -Math.PI / 5;
                                self.object3d.add(self.mesh);
                            });
                    };
                })(this));
        }

        render() {
            requestAnimationFrame((function(self: BLClient.WebglRenderer, previousTime: number) {
                return function animate(now: number) {
                    requestAnimationFrame(animate);
                    var delta = now - previousTime;

                    if (delta > 1000 / self.fps) {
                        previousTime = now;
                        self.renderingFn();
                    }
                };
            })(this, performance.now()));
        }

        private renderingFn() {

            var marker: NyARSquare = this.videoGrabber.detectMarker();

            if (!_.isUndefined(marker)) {
                var coordinate: BLClient.Coordinate = {};
                marker.getCenter2d(coordinate);

                var dx: number = -2.25 + (10.8 * coordinate.x / 640.0);
                var dy: number = 1.8 - (8.0 * coordinate.y / 480.0);
                //dx = -3.0 + (5.4 * coordinate.x / 640.0);
                //dy = 1.2 - (4.0 * coordinate.y / 480.0);

                var matrix: THREE.Matrix4 = new THREE.Matrix4();
                matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
                this.object3d.matrixAutoUpdate = false;
                this.object3d.matrix.makeRotationX(Math.PI / 10);
                this.object3d.matrix.copyPosition(matrix);

                var scale: number = 0.009 +
                    Math.sqrt(
                        Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                        Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2)
                        ) / 5000;
                this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;
            }

            this.renderer.render(this.scene, this.camera);
        }

        private addLight() {
            var light: any = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 100, 60);
            light.castShadow = true;
            light.shadow.camera.left = -60;
            light.shadow.camera.top = -60;
            light.shadow.camera.right = 60;
            light.shadow.camera.bottom = 60;
            light.shadow.camera.near = 1;
            light.shadow.camera.far = 1000;
            light.shadow.bias = -.0001;
            light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
            this.scene.add(light);
        }

    }

}