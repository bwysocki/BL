import {Component} from 'angular2/core';
import {FpsProgress } from '../fps-progress.component';
import {WebCameraGrabber} from '../../camera/web-camera-grabber';
import {WebglRenderer} from '../../webgl/webgl-renderer';
import {ServerService} from '../../angular-services/server-service';

export enum ModelName {
    CAR,
    LOGO
}

export interface VideoConfiguration {
    model: ModelName;
    fps: number;
    logoColor: string;
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
    templateUrl: '/src/classes/angular-components/bl/bl.html'
})
export class BLComponent {

    public configuration: VideoConfiguration = {
        fps: 30,
        model : ModelName.LOGO,
        logoColor: "#7f7f7f"
    };

    constructor(private serverService: ServerService) {

        Logger.useDefaults();

        // set up video
        const video = <HTMLVideoElement> document.querySelector('video');
        const videoGrabber: WebCameraGrabber = new WebCameraGrabber(video);
        videoGrabber.play();

        // start presenting
        const webglrenderer: WebglRenderer = new WebglRenderer('augmented-object', videoGrabber, this.configuration);
        webglrenderer.add3dObjectsAndRender();

    }

}

