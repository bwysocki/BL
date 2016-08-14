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
var ServerService = (function () {
    function ServerService() {
        this.socket = io(ServerService.URL);
    }
    ServerService.prototype.setUpdateCalback = function (callback) {
        this.socket.on(ServerService.UPDATE_COMMAND, function (data) {
            callback(data);
        });
    };
    ServerService.prototype.listen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.on(ServerService.INIT_COMMAND, function (data) {
                resolve(data);
            });
        });
    };
    ServerService.INIT_COMMAND = 'INIT';
    ServerService.UPDATE_COMMAND = 'UPDATE';
    ServerService.URL = 'http://localhost:3001/updateinfo';
    ServerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
