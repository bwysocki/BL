import {bootstrap} from 'angular2/platform/browser';
import {BLComponent} from './classes/angular-components/bl/bl';
import {ServerService} from './classes/angular-services/server-service/server-service';
import {WebCameraGrabber} from './classes/angular-services/web-camera-grabber/web-camera-grabber';
import {WebglRenderer} from './classes/angular-services/webgl-renderer/webgl-renderer';

bootstrap(BLComponent, [
    ServerService,
    WebCameraGrabber,
    WebglRenderer
]);
