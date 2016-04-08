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
    var Progress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            Progress = (function () {
                function Progress(m_elementRef) {
                    this.m_elementRef = m_elementRef;
                    this.valChange = new core_1.EventEmitter();
                }
                Progress.prototype.ngOnInit = function () {
                    var _this = this;
                    var sliderElemenet = jQuery(this.m_elementRef.nativeElement).find('.slider');
                    sliderElemenet.slider({
                        max: parseInt(this.max, 10),
                        min: parseInt(this.min, 10),
                        range: false,
                        slide: function (event, ui) {
                            _this.valChange.next(ui.value);
                        },
                        value: 0
                    });
                    this.valEmitter.subscribe(function (val) {
                        sliderElemenet.slider('value', val);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Progress.prototype, "max", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Progress.prototype, "min", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Progress.prototype, "valEmitter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Progress.prototype, "valChange", void 0);
                Progress = __decorate([
                    core_1.Component({
                        directives: [ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES],
                        selector: 'bl-progress',
                        template: "<div class=\"slider\"></div>"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Progress);
                return Progress;
            }());
            exports_1("Progress", Progress);
        }
    }
});
