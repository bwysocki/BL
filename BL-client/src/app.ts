///<reference path='../declarations/logger.d.ts'/>
///<reference path='classes/camera/web-camera-grabber.ts'/>
///<reference path='classes/websocket/web-socket-connector.ts'/>

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    Logger.useDefaults();

    //set up video
    var video = <HTMLVideoElement> document.querySelector('video');
    var videoGrabber: BLClient.WebCameraGrabber = new BLClient.WebCameraGrabber(video);
    videoGrabber.play();

    //start listening
    var websocket: BLClient.WebSocketConnector = new BLClient.WebSocketConnector('http://localhost:3001/updateinfo');
    websocket.listen();

    //start presenting
    var webglrenderer: BLClient.WebglRenderer = new BLClient.WebglRenderer('augmented-object', videoGrabber);
    webglrenderer.add3dObject('/img/logo.json');
    webglrenderer.render();
});
