import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Progress } from '../progress.component';
import {WebCameraGrabber} from '../../angular-services/web-camera-grabber';
import {WebglRenderer} from '../../webgl/webgl-renderer';
import {ServerService} from '../../angular-services/server-service';

export enum ModelName {
    CAR,
    LOGO
}

export interface VideoConfiguration {
    model?: ModelName;
    fps?: number;
    logoColor?: string;
    threshold?: number;
}

@Component({
    directives: [Progress],
    selector: 'bl',
    templateUrl: '/src/classes/angular-components/bl/bl.html'
})
export class BLComponent {

    public configuration: VideoConfiguration = {};
    public fpsObservable: Observable<number>;
    public thresholdObservable: Observable<number>;
    private fpsObserver: Observer<number>;
    private thresholdObserver: Observer<number>;

    constructor(private serverService: ServerService, private videoGrabber: WebCameraGrabber) {

        Logger.useDefaults();
        
        this.fpsObservable = Observable.create((observer) => this.fpsObserver = observer);
        this.thresholdObservable = Observable.create((observer) => this.thresholdObserver = observer);

        serverService.listen().then((serverConfiguration: VideoConfiguration) => {
            
            this.configuration = serverConfiguration;
            this.fpsObserver.next(this.configuration.fps);
            this.thresholdObserver.next(this.configuration.threshold);

            videoGrabber.play();

            // start presenting
            const webglrenderer: WebglRenderer = new WebglRenderer('augmented-object', videoGrabber, this.configuration);
            webglrenderer.add3dObjectsAndRender();

        });

    }

}

