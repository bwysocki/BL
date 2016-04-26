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
var FakeWebglRenderer = (function () {
    function FakeWebglRenderer() {
        return;
    }
    FakeWebglRenderer.prototype.useConfiguration = function (configuration) {
        return;
    };
    FakeWebglRenderer.prototype.add3dObjectsAndRender = function () {
        return;
    };
    FakeWebglRenderer.prototype.render = function () {
        return;
    };
    FakeWebglRenderer.prototype.renderingFn = function () {
        return;
    };
    FakeWebglRenderer.prototype.updateScale = function (marker) {
        return 0;
    };
    FakeWebglRenderer.prototype.updateRotation = function (object3d, a, b) {
        return;
    };
    FakeWebglRenderer.prototype.updateObjectPositionWithMarker = function (coordinate, initialX, initialY) {
        return undefined;
    };
    FakeWebglRenderer.prototype.findYAngle = function (a, b) {
        return 0;
    };
    FakeWebglRenderer = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FakeWebglRenderer);
    return FakeWebglRenderer;
}());
exports.FakeWebglRenderer = FakeWebglRenderer;
