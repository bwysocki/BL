/// <reference path="../../interfaces/websocket.ts" />
	
module BLClient {

    export class WebSocketConnector {

        private _socket: BLClient.Socket;
        private _COMMAND: string = 'UPDATE';

        constructor(url: string) {
            this._socket = io(url);
        }

        listen() {
            this._socket.on(this._COMMAND, function(data: Message) {
                console.log(data)
            });
        }

    }

}