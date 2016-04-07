"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var progress_component_1 = require('../progress.component');
var webgl_renderer_1 = require('../../webgl/webgl-renderer');
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
        this.fpsobservable = Observable_1.Observable.create(function (observer) { return _this.fpsObserver = observer; });
        serverService.listen().then(function (serverConfiguration) {
            _this.configuration = serverConfiguration;
            _this.fpsObserver.next(_this.configuration.fps);
            videoGrabber.play();
            // start presenting
            var webglrenderer = new webgl_renderer_1.WebglRenderer('augmented-object', videoGrabber, _this.configuration);
            webglrenderer.add3dObjectsAndRender();
        });
    }
    BLComponent = __decorate([
        core_1.Component({
            directives: [progress_component_1.Progress],
            selector: 'bl',
            templateUrl: '/src/classes/angular-components/bl/bl.html'
        })
    ], BLComponent);
    return BLComponent;
}());
exports.BLComponent = BLComponent;
