"use strict";
var browser_1 = require('angular2/platform/browser');
var bl_1 = require('./classes/angular-components/bl/bl');
var server_service_1 = require('./classes/angular-services/server-service/server-service');
var web_camera_grabber_1 = require('./classes/angular-services/web-camera-grabber/web-camera-grabber');
browser_1.bootstrap(bl_1.BLComponent, [server_service_1.ServerService, web_camera_grabber_1.WebCameraGrabber]);
