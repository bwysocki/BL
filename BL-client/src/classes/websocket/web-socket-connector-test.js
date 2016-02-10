describe('Web socket connector', function () {
    'use strict';
    
    var websocket;
    
    beforeEach(function() {
    	websocket = new BLClient.WebSocketConnector('http://localhost:3001/updateinfo')
    	spyOn(websocket._socket, 'on');
    	websocket.listen();
    });
    
    it('is initialized.', function () {
        expect(websocket._socket).not.toBeNull();
    });
    
    it('started listening', function () {
    	expect(websocket._socket.on).toHaveBeenCalled();
    });
    
});
