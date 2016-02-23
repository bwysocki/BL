///<reference path='../declarations/logger.d.ts'/>
///<reference path='classes/camera/web-camera-grabber.ts'/>
///<reference path='classes/websocket/web-socket-connector.ts'/>
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Logger.useDefaults();
    //set up video
    var video = document.querySelector('video');
    var videoGrabber = new BLClient.WebCameraGrabber(video);
    videoGrabber.play();
    //start listening
    var websocket = new BLClient.WebSocketConnector('http://localhost:3001/updateinfo');
    websocket.listen();
    //start presenting
    var webglrenderer = new BLClient.WebglRenderer('augmented-object', videoGrabber);
    webglrenderer.add3dObject('/img/test.png');
    webglrenderer.render();
});
//# sourceMappingURL=app.js.map