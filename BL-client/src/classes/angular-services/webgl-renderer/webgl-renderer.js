"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var bl_1 = require('../../angular-components/bl/bl');
var WebglRenderer = (function () {
    function WebglRenderer(videoGrabber) {
        this.videoGrabber = videoGrabber;
        this.objects3d = [];
        var canvas = document.getElementById('augmented-object');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
        this.camera.position.z = 5;
        this.addLight();
    }
    WebglRenderer.prototype.useConfiguration = function (configuration) {
        this.currentModel = configuration.model;
        this.configuration = configuration;
    };
    WebglRenderer.prototype.add3dObjectsAndRender = function () {
        var _this = this;
        var manager = new THREE.LoadingManager();
        this.addCarObject(manager);
        this.addBlsLogo(manager);
        manager.onLoad = function () {
            _this.scene.add(_this.objects3d[0]);
            _this.scene.add(_this.objects3d[1]);
            _this.render();
        };
    };
    WebglRenderer.prototype.render = function () {
        requestAnimationFrame((function (self, previousTime) {
            return function animate(now) {
                var delta = now - previousTime;
                if (delta > 1000 / self.configuration.fps) {
                    previousTime = now;
                    self.renderingFn();
                }
                requestAnimationFrame(animate);
            };
        })(this, performance.now()));
    };
    WebglRenderer.prototype.renderingFn = function () {
        var marker = this.videoGrabber.detectMarker(this.configuration);
        var _a = this.getCurrentRenderingConf(), object3d = _a.object3d, mesh = _a.mesh, initialX = _a.initialX, initialY = _a.initialY;
        if (!_.isUndefined(marker)) {
            var coordinate = {};
            marker.getCenter2d(coordinate);
            object3d.matrixAutoUpdate = false;
            var diagonal = Math.sqrt(Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2));
            var scale = 0.001 + diagonal / 4000;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
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
            object3d.matrix.multiplyMatrices(m1, m2);
            object3d.matrix.multiply(m3);
            object3d.matrix.copyPosition(this.updateObjectPositionWithMarker(coordinate, initialX, initialY));
            object3d.visible = true;
            this.renderer.render(this.scene, this.camera);
        }
    };
    WebglRenderer.prototype.updateObjectPositionWithMarker = function (coordinate, initialX, initialY) {
        var dx = initialX + (5.4 * coordinate.x / 640.0);
        var dy = initialY - (4.0 * coordinate.y / 480.0);
        var matrix = new THREE.Matrix4();
        matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
        return matrix;
    };
    WebglRenderer.prototype.findYAngle = function (a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x) + Math.PI - 3.2;
    };
    WebglRenderer.prototype.getCurrentRenderingConf = function () {
        var object3d = this.objects3d[this.configuration.model];
        var mesh = this.objects3d[this.configuration.model].children[0];
        if (this.currentModel !== this.configuration.model) {
            this.objects3d[this.currentModel].visible = false;
            this.currentModel = this.configuration.model;
        }
        var initialX = -3.0;
        var initialY = 1.2;
        if (this.currentModel === bl_1.ModelName.LOGO) {
            mesh.material.color = new THREE.Color(this.configuration.logoColor);
            initialX = -2.5;
            initialY = 2;
        }
        return {
            object3d: object3d, mesh: mesh, initialX: initialX, initialY: initialY
        };
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
                object.visible = false;
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
    WebglRenderer = __decorate([
        core_1.Injectable()
    ], WebglRenderer);
    return WebglRenderer;
}());
exports.WebglRenderer = WebglRenderer;
