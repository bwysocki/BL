System.register(['angular2/core', 'rxjs/Observable', '../progress.component', '../../angular-services/web-camera-grabber', '../../webgl/webgl-renderer', '../../angular-services/server-service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, progress_component_1, web_camera_grabber_1, webgl_renderer_1, server_service_1;
    var ModelName, BLComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (progress_component_1_1) {
                progress_component_1 = progress_component_1_1;
            },
            function (web_camera_grabber_1_1) {
                web_camera_grabber_1 = web_camera_grabber_1_1;
            },
            function (webgl_renderer_1_1) {
                webgl_renderer_1 = webgl_renderer_1_1;
            },
            function (server_service_1_1) {
                server_service_1 = server_service_1_1;
            }],
        execute: function() {
            (function (ModelName) {
                ModelName[ModelName["CAR"] = 0] = "CAR";
                ModelName[ModelName["LOGO"] = 1] = "LOGO";
            })(ModelName || (ModelName = {}));
            exports_1("ModelName", ModelName);
            BLComponent = (function () {
                function BLComponent(serverService, videoGrabber) {
                    var _this = this;
                    this.serverService = serverService;
                    this.videoGrabber = videoGrabber;
                    this.configuration = {};
                    Logger.useDefaults();
                    this.fpsObservable = Observable_1.Observable.create(function (observer) { return _this.fpsObserver = observer; });
                    this.thresholdObservable = Observable_1.Observable.create(function (observer) { return _this.thresholdObserver = observer; });
                    serverService.listen().then(function (serverConfiguration) {
                        _this.configuration = serverConfiguration;
                        _this.fpsObserver.next(_this.configuration.fps);
                        _this.thresholdObserver.next(_this.configuration.threshold);
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
                    }), 
                    __metadata('design:paramtypes', [server_service_1.ServerService, web_camera_grabber_1.WebCameraGrabber])
                ], BLComponent);
                return BLComponent;
            }());
            exports_1("BLComponent", BLComponent);
        }
    }
});
