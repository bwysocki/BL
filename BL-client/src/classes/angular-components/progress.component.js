"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var Progress = (function () {
    function Progress(m_elementRef) {
        this.m_elementRef = m_elementRef;
        this.valChange = new core_1.EventEmitter();
    }
    Progress.prototype.ngOnInit = function () {
        var _this = this;
        jQuery(this.m_elementRef.nativeElement).find('.slider').slider({
            max: ~~this.max,
            min: ~~this.min,
            range: false,
            slide: function (event, ui) {
                _this.val = ui.value;
                _this.valChange.next(_this.val);
            },
            value: this.val === undefined ? 0 : this.val
        });
        this.observable.subscribe(function (val) {
            jQuery(_this.m_elementRef.nativeElement).find('.slider').slider('value', val);
        });
    };
    __decorate([
        core_1.Input()
    ], Progress.prototype, "val", void 0);
    __decorate([
        core_1.Input()
    ], Progress.prototype, "max", void 0);
    __decorate([
        core_1.Input()
    ], Progress.prototype, "min", void 0);
    __decorate([
        core_1.Input()
    ], Progress.prototype, "observable", void 0);
    __decorate([
        core_1.Output()
    ], Progress.prototype, "valChange", void 0);
    Progress = __decorate([
        core_1.Component({
            directives: [ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES],
            selector: 'bl-progress',
            template: "<div class=\"slider\"></div>"
        })
    ], Progress);
    return Progress;
}());
exports.Progress = Progress;
