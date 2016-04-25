import {Component, EventEmitter} from 'angular2/core';
import {Progress } from '../progress.component';
import {WebCameraGrabber} from '../../angular-services/web-camera-grabber/web-camera-grabber';
import {WebglRenderer} from '../../angular-services/webgl-renderer/webgl-renderer';
import {ServerService} from '../../angular-services/server-service/server-service';

export enum ModelName {
    CAR,
    LOGO
}

export interface VideoConfiguration {
    model?: ModelName;
    fps?: number;
    logoColor?: string;
    threshold?: number;
    thresholdChecked?: boolean;
}

@Component({
    directives: [Progress],
    selector: 'bl',
    templateUrl: '/src/classes/angular-components/bl/bl.html'
})
export class BLComponent {

    public configuration: VideoConfiguration = {};
    public fpsEmitter: EventEmitter<number>;
    public thresholdEmitter: EventEmitter<number>;

    constructor(private serverService: ServerService, private videoGrabber: WebCameraGrabber, private webglRenderer: WebglRenderer) {

        Logger.useDefaults();

        this.fpsEmitter = new EventEmitter<number>();
        this.thresholdEmitter = new EventEmitter<number>();

        serverService.listen().then((serverConfiguration: VideoConfiguration) => {

            this.configuration = serverConfiguration;
            this.fpsEmitter.emit(this.configuration.fps);
            this.thresholdEmitter.emit(this.configuration.threshold);

            videoGrabber.play();

            webglRenderer.useConfiguration(this.configuration);
            webglRenderer.add3dObjectsAndRender();

        });

    }

    public thresholdIsEnabled(): boolean {
        return !this.configuration.thresholdChecked;
    }

    public logoIsSelected(): boolean {
        return this.configuration.model === ModelName.LOGO;
    }

    public carIsSelected(): boolean {
        return this.configuration.model === ModelName.CAR;
    }

    public selectModel(val: string): void {
        if ('0' === val) {
            this.configuration.model = ModelName.CAR;
        } else if ('1' === val) {
            this.configuration.model = ModelName.LOGO;
        }
    }

}

