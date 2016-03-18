/// <reference path="../../../types-custom/defs.d.ts" />
var BLClient;
(function (BLClient) {
    var WebglRenderer = (function () {
        function WebglRenderer(canvasId, videoGrabber) {
            this.objects3d = [];
            this.fps = 30;
            var canvas = document.getElementById(canvasId);
            this.videoGrabber = videoGrabber;
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
            });
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
            this.camera.position.z = 5;
            this.addLight();
        }
        WebglRenderer.prototype.add3dObjectsAndRender = function () {
            var manager = new THREE.LoadingManager();
            this.addCarObject(manager);
            this.addBlsLogo(manager);
            /*
            manager.onLoad = (function(self: BLClient.WebglRenderer) {
                return function() {
                    var i = 1;
                    self.scene.add(self.objects3d[0]);
                    self.scene.add(self.objects3d[1]);
                    self.object3d = self.objects3d[i];
                    self.mesh = self.objects3d[i].children[0];
                    self.render();
                }
            })(this);
            */
            manager.onLoad = function () {
                var i = 0;
                this.scene.add(this.objects3d[0]);
                this.scene.add(this.objects3d[1]);
                this.object3d = this.objects3d[i];
                this.mesh = this.objects3d[i].children[0];
                this.render();
            }.bind(this);
        };
        WebglRenderer.prototype.render = function () {
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
        };
        WebglRenderer.prototype.renderingFn = function () {
            var marker = this.videoGrabber.detectMarker();
            if (!_.isUndefined(marker)) {
                var coordinate = {};
                marker.getCenter2d(coordinate);
                var dx = -2.25 + (10.8 * coordinate.x / 640.0);
                var dy = 1.8 - (8.0 * coordinate.y / 480.0);
                dx = -3.0 + (5.4 * coordinate.x / 640.0);
                dy = 1.2 - (4.0 * coordinate.y / 480.0);
                var matrix = new THREE.Matrix4();
                matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
                this.object3d.matrixAutoUpdate = false;
                //this.object3d.matrix.extractRotation(matrix);
                var diagonal = Math.sqrt(Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                    Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2));
                var scale = 0.001 + diagonal / 4000;
                this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;
                //this.object3d.scale.x = this.object3d.scale.y = this.object3d.scale.z = scale / 100;
                var zRotation = Math.sqrt(Math.pow(marker.sqvertex[0].x - marker.sqvertex[2].x, 2) +
                    Math.pow(marker.sqvertex[0].y - marker.sqvertex[2].y, 2)) / scale;
                var a = {
                    x: marker.sqvertex[0].x,
                    y: marker.sqvertex[0].y
                }, b = {
                    x: coordinate.x,
                    y: coordinate.y
                };
                var m1 = new THREE.Matrix4();
                var m2 = new THREE.Matrix4();
                var m3 = new THREE.Matrix4();
                m1.makeRotationY(this.findYAngle(a, b));
                m2.makeRotationX(Math.PI / 20);
                m3.makeRotationZ(0);
                this.object3d.matrix.multiplyMatrices(m1, m2);
                this.object3d.matrix.multiply(m3);
                this.object3d.matrix.copyPosition(matrix);
                this.object3d.visible = true;
            }
            this.renderer.render(this.scene, this.camera);
        };
        WebglRenderer.prototype.findYAngle = function (a, b) {
            var dy = b.y - a.y;
            var dx = b.x - a.x;
            return Math.atan2(dy, dx) + Math.PI - 3.2;
        };
        WebglRenderer.prototype.addCarObject = function (manager) {
            new THREE.JSONLoader().load('/img/logo.json', (function (objects3d) {
                return function (geometry, materials) {
                    var loader = new THREE.TextureLoader();
                    loader.load('/img/textures/gtare.jpg', function (texture) {
                        var material = new THREE.MeshLambertMaterial({
                            map: texture
                        }), mesh, object;
                        mesh = new THREE.Mesh(geometry, material);
                        mesh.rotation.y = -Math.PI / 5;
                        object = new THREE.Object3D();
                        object.add(mesh);
                        object.visible = false;
                        objects3d[objects3d.length] = object;
                    });
                };
            })(this.objects3d));
        };
        WebglRenderer.prototype.addBlsLogo = function (manager) {
            new THREE.ObjectLoader(manager).load('/img/LOGO_HIPOLY.json', (function (objects3d) {
                return function (object) {
                    object.position.y = 0;
                    object.visible = false;
                    object.scale.x = object.scale.y = object.scale.z = 0.01;
                    objects3d[objects3d.length] = object;
                };
            })(this.objects3d));
        };
        WebglRenderer.prototype.addLight = function () {
            var light = new THREE.DirectionalLight(0xffffff);
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
        };
        return WebglRenderer;
    }());
    BLClient.WebglRenderer = WebglRenderer;
})(BLClient || (BLClient = {}));
