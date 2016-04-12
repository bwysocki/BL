import {beforeEach, describe, expect, it} from 'angular2/testing';
import {ServerService} from './server-service';
import {VideoConfiguration} from '../angular-components/bl/bl';

describe('Web socket server service ', () => {
    'use strict';

    let websocket: ServerService;
    let mockServerResponse = () => {
        (<any>websocket.socket)._callbacks.$INIT[0].call(websocket.socket, {
            fps: 20,
            model : 0,
            logoColor: '#7f7f7f',
            threshold: 15,
            thresholdChecked: false
        });
    };

    beforeEach(() => {
        websocket = new ServerService();
    });

    it('is initialized.', () => {
        expect(websocket.socket).not.toBeNull();
    });

    it('started listening.', () => {
        spyOn(websocket.socket, 'on');
        websocket.listen();
        expect(websocket.socket.on).toHaveBeenCalled();
    });

    it('returned promise after listening.', () => {
        expect(websocket.listen()).toBePromise();
    });

    it('returned configuration after promise fulfilled.', (done: () => void) => {
        let configurationPromise: Promise<VideoConfiguration> = websocket.listen();
        configurationPromise.then((conf: VideoConfiguration) => {
            expect(conf).not.toBeUndefined();
            expect(conf).not.toBeNull();
            expect(conf.threshold).toEqual(15);
            done();
        });
        mockServerResponse();
    });

});
