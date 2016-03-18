import {Component} from 'angular2/core';
import {FpsProgress } from './fps-progress.component';
import {WebCameraGrabber} from '../camera/web-camera-grabber';
import {WebSocketConnector} from '../websocket/web-socket-connector';
import {WebglRenderer} from '../webgl/webgl-renderer';

export enum ModelName {
    CAR,
    LOGO
}

export interface VideoConfiguration {
    modelIndex: ModelName;
    fps: number;
}

@Component({
    directives: [FpsProgress],
    selector: 'bl',
    styles: [`
        h1 {
            color: blue    
        }
        .progress {
            width: 500px;
        }
    `],
    template: `
            <h1>test me {{configuration.modelIndex}}, {{configuration.fps}} </h1> 
            <input [(ngModel)]="configuration.fps">
            <fps-progress [(fps)]="configuration.fps"></fps-progress>
    `
})
export class BLComponent {

    public configuration: VideoConfiguration = {
        fps: 30,
        modelIndex : ModelName.CAR
    };

    constructor() {

        Logger.useDefaults();

        // set up video
        const video = <HTMLVideoElement> document.querySelector('video');
        const videoGrabber: WebCameraGrabber = new WebCameraGrabber(video);
        videoGrabber.play();

        // start listening
        const websocket: WebSocketConnector = new WebSocketConnector('http://localhost:3001/updateinfo');
        websocket.listen();

        // start presenting
        const webglrenderer: WebglRenderer = new WebglRenderer('augmented-object', videoGrabber, this.configuration);
        webglrenderer.add3dObjectsAndRender();

    }

}

