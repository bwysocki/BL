"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var ServerService = (function () {
    function ServerService() {
        this.INIT_COMMAND = 'INIT';
        this.socket = io('http://localhost:3001/updateinfo');
    }
    ServerService.prototype.listen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.on(_this.INIT_COMMAND, function (data) {
                Logger.info('Used configuration: ', data);
                resolve(data);
            });
        });
    };
    ServerService = __decorate([
        core_1.Injectable()
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
