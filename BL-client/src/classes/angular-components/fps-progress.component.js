"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var FpsProgress = (function () {
    function FpsProgress(m_elementRef) {
        this.m_elementRef = m_elementRef;
        this.fpsChange = new core_1.EventEmitter();
    }
    FpsProgress.prototype.ngOnInit = function () {
        var _this = this;
        jQuery(this.m_elementRef.nativeElement).find('.slider').slider({
            max: 70,
            min: 5,
            range: false,
            slide: function (event, ui) {
                _this.fps = ui.value;
                _this.fpsChange.next(_this.fps);
            },
            value: this.fps
        });
    };
    __decorate([
        core_1.Input()
    ], FpsProgress.prototype, "fps", void 0);
    __decorate([
        core_1.Output()
    ], FpsProgress.prototype, "fpsChange", void 0);
    FpsProgress = __decorate([
        core_1.Component({
            directives: [ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES],
            selector: 'fps-progress',
            template: "<div class=\"slider\"></div>"
        })
    ], FpsProgress);
    return FpsProgress;
}());
exports.FpsProgress = FpsProgress;
