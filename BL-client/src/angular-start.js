"use strict";
var browser_1 = require('angular2/platform/browser');
var bl_1 = require('./classes/angular-components/bl/bl');
var server_service_1 = require('./classes/angular-services/server-service');
browser_1.bootstrap(bl_1.BLComponent, [server_service_1.ServerService]);
