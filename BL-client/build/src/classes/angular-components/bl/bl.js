"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var progress_component_1 = require('../progress.component');
var web_camera_grabber_1 = require('../../angular-services/web-camera-grabber');
var webgl_renderer_1 = require('../../webgl/webgl-renderer');
var server_service_1 = require('../../angular-services/server-service');
(function (ModelName) {
    ModelName[ModelName["CAR"] = 0] = "CAR";
    ModelName[ModelName["LOGO"] = 1] = "LOGO";
})(exports.ModelName || (exports.ModelName = {}));
var ModelName = exports.ModelName;
var BLComponent = (function () {
    function BLComponent(serverService, videoGrabber) {
        var _this = this;
        this.serverService = serverService;
        this.videoGrabber = videoGrabber;
        this.configuration = {};
        Logger.useDefaults();
        this.fpsEmitter = new core_1.EventEmitter();
        this.thresholdEmitter = new core_1.EventEmitter();
        serverService.listen().then(function (serverConfiguration) {
            _this.configuration = serverConfiguration;
            _this.fpsEmitter.emit(_this.configuration.fps);
            _this.thresholdEmitter.emit(_this.configuration.threshold);
            videoGrabber.play();
            // start presenting
            var webglrenderer = new webgl_renderer_1.WebglRenderer('augmented-object', videoGrabber, _this.configuration);
            webglrenderer.add3dObjectsAndRender();
        });
    }
    BLComponent.prototype.thresholdIsEnabled = function () {
        return !this.configuration.thresholdChecked;
    };
    BLComponent.prototype.logoIsSelected = function () {
        return this.configuration.model === ModelName.LOGO;
    };
    BLComponent.prototype.carIsSelected = function () {
        return this.configuration.model === ModelName.CAR;
    };
    BLComponent.prototype.selectModel = function (val) {
        if ('0' === val) {
            this.configuration.model = ModelName.CAR;
        }
        else if ('1' === val) {
            this.configuration.model = ModelName.LOGO;
        }
    };
    BLComponent = __decorate([
        core_1.Component({
            directives: [progress_component_1.Progress],
            selector: 'bl',
            templateUrl: '/src/classes/angular-components/bl/bl.html'
        }), 
        __metadata('design:paramtypes', [server_service_1.ServerService, web_camera_grabber_1.WebCameraGrabber])
    ], BLComponent);
    return BLComponent;
}());
exports.BLComponent = BLComponent;
