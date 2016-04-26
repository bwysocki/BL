"use strict";
var testing_1 = require('angular2/testing');
var core_1 = require('angular2/core');
var progress_1 = require('./progress');
testing_1.describe('Progress component ', function () {
    'use strict';
    var tcb;
    testing_1.beforeEach(testing_1.inject([testing_1.TestComponentBuilder], function (tcBuilder) {
        tcb = tcBuilder;
    }));
    testing_1.it('should render jquery-ui progress.', testing_1.injectAsync([], function () {
        return tcb.createAsync(progress_1.Progress).then(function (fixture) {
            var progressCmp = fixture.componentInstance;
            progressCmp.max = 10;
            progressCmp.min = 1;
            progressCmp.valEmitter = new core_1.EventEmitter();
            fixture.detectChanges();
            var element = fixture.nativeElement;
            testing_1.expect(element.querySelector('.ui-slider')).toBeDefined();
        });
    }));
});
