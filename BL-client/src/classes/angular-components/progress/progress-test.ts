import {beforeEach, describe, setBaseTestProviders, expect, it, inject, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import {EventEmitter} from 'angular2/core';
import {Progress} from './progress';

describe('Progress component ', () => {
    'use strict';

    let tcb: TestComponentBuilder;

    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

    beforeEach(inject([TestComponentBuilder], (tcBuilder) => {
        tcb = tcBuilder;
    }));

    it('should render jquery-ui progress.', injectAsync([], () => {
        return tcb.createAsync(Progress).then(fixture => {
            let progressCmp = fixture.componentInstance;
            progressCmp.max = 10;
            progressCmp.min = 1;
            progressCmp.valEmitter = new EventEmitter();

            fixture.detectChanges();

            let element = fixture.nativeElement;
            expect(element.querySelector('.ui-slider')).toBeDefined();
        });
    }));

});
