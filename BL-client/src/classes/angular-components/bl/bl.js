"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var fps_progress_component_1 = require('../fps-progress.component');
var web_camera_grabber_1 = require('../../camera/web-camera-grabber');
var web_socket_connector_1 = require('../../websocket/web-socket-connector');
var webgl_renderer_1 = require('../../webgl/webgl-renderer');
(function (ModelName) {
    ModelName[ModelName["CAR"] = 0] = "CAR";
    ModelName[ModelName["LOGO"] = 1] = "LOGO";
})(exports.ModelName || (exports.ModelName = {}));
var ModelName = exports.ModelName;
var BLComponent = (function () {
    function BLComponent(serverService) {
        this.serverService = serverService;
        this.configuration = {
            fps: 30,
            model: ModelName.LOGO
        };
        Logger.useDefaults();
        // set up video
        var video = document.querySelector('video');
        var videoGrabber = new web_camera_grabber_1.WebCameraGrabber(video);
        videoGrabber.play();
        // start listening
        var websocket = new web_socket_connector_1.WebSocketConnector('http://localhost:3001/updateinfo');
        websocket.listen();
        // start presenting
        var webglrenderer = new webgl_renderer_1.WebglRenderer('augmented-object', videoGrabber, this.configuration);
        webglrenderer.add3dObjectsAndRender();
    }
    BLComponent = __decorate([
        core_1.Component({
            directives: [fps_progress_component_1.FpsProgress],
            selector: 'bl',
            styles: ["\n        h1 {\n            color: blue    \n        }\n        .progress {\n            width: 500px;\n        }\n    "],
            templateUrl: '/src/classes/angular-components/bl/bl.html'
        })
    ], BLComponent);
    return BLComponent;
}());
exports.BLComponent = BLComponent;
