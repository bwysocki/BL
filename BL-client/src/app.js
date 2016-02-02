///<reference path='classes/web-camera-grabber.ts'/>
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var video = document.querySelector('video');
    var videoGrabber = new BLClient.WebCameraGrabber(video);
    videoGrabber.play();
});
//# sourceMappingURL=app.js.map