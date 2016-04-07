System.register(['angular2/platform/browser', './classes/angular-components/bl/bl', './classes/angular-services/server-service', './classes/angular-services/web-camera-grabber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, bl_1, server_service_1, web_camera_grabber_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (bl_1_1) {
                bl_1 = bl_1_1;
            },
            function (server_service_1_1) {
                server_service_1 = server_service_1_1;
            },
            function (web_camera_grabber_1_1) {
                web_camera_grabber_1 = web_camera_grabber_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(bl_1.BLComponent, [server_service_1.ServerService, web_camera_grabber_1.WebCameraGrabber]);
        }
    }
});
