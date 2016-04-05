System.register(['angular2/core', '../fps-progress.component', '../../camera/web-camera-grabber', '../../websocket/web-socket-connector', '../../webgl/webgl-renderer', '../../angular-services/server-service'], function(exports_1, context_1) {
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
    var core_1, fps_progress_component_1, web_camera_grabber_1, web_socket_connector_1, webgl_renderer_1, server_service_1;
    var ModelName, BLComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (fps_progress_component_1_1) {
                fps_progress_component_1 = fps_progress_component_1_1;
            },
            function (web_camera_grabber_1_1) {
                web_camera_grabber_1 = web_camera_grabber_1_1;
            },
            function (web_socket_connector_1_1) {
                web_socket_connector_1 = web_socket_connector_1_1;
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
                        templateUrl: '/src/classes/angular-components/bl/bl.component.html'
                    }), 
                    __metadata('design:paramtypes', [server_service_1.ServerService])
                ], BLComponent);
                return BLComponent;
            }());
            exports_1("BLComponent", BLComponent);
        }
    }
});
