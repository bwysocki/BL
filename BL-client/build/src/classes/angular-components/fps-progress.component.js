System.register(['angular2/core', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, ng2_bootstrap_1;
    var FpsProgress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            FpsProgress = (function () {
                function FpsProgress(m_elementRef) {
                    this.m_elementRef = m_elementRef;
                    this.fpsChange = new core_1.EventEmitter();
                }
                FpsProgress.prototype.ngOnInit = function () {
                    var _this = this;
                    jQuery(this.m_elementRef.nativeElement).find('.slider').slider({
                        max: 50,
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
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], FpsProgress.prototype, "fps", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], FpsProgress.prototype, "fpsChange", void 0);
                FpsProgress = __decorate([
                    core_1.Component({
                        directives: [ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES],
                        selector: 'fps-progress',
                        template: "<div class=\"slider\"></div>"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], FpsProgress);
                return FpsProgress;
            }());
            exports_1("FpsProgress", FpsProgress);
        }
    }
});
