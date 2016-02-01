var WebCameraGrabber = (function () {
    function WebCameraGrabber() {
        getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    }
    WebCameraGrabber.prototype.grabVideo = function (successCallback) {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, successCallback, function () {
                console.log('Problem with streaming webcamera video.');
            });
        }
        else {
            console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
        }
    };
    return WebCameraGrabber;
})();
