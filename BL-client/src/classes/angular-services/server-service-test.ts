import {beforeEach, describe, expect, it, inject, beforeEachProviders} from 'angular2/testing';
import {ServerService} from './server-service';
import {VideoConfiguration} from '../angular-components/bl/bl';

describe('Web socket server service ', () => {
    'use strict';

    let service: ServerService;
    let mockServerResponse = () => {
        (<any>service.socket)._callbacks.$INIT[0].call(service.socket, {
            fps: 20,
            model : 0,
            logoColor: '#7f7f7f',
            threshold: 15,
            thresholdChecked: false
        });
    };

    beforeEachProviders(() => [ServerService]);

    beforeEach(inject([ServerService], (serverService) => {
        service = serverService;
    }));

    it('is initialized.', () => {
        expect(service.socket).not.toBeNull();
    });

    it('started listening.', () => {
        spyOn(service.socket, 'on');
        service.listen();
        expect(service.socket.on).toHaveBeenCalled();
    });

    it('returned promise after listening.', () => {
        expect(service.listen()).toBePromise();
    });

    it('returned configuration after promise fulfilled.', (done: () => void) => {
        let configurationPromise: Promise<VideoConfiguration> = service.listen();
        configurationPromise.then((conf: VideoConfiguration) => {
            expect(conf).not.toBeUndefined();
            expect(conf).not.toBeNull();
            expect(conf.threshold).toEqual(15);
            done();
        });
        mockServerResponse();
    });

});
