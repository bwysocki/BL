///<reference path='../../../declarations/blclient.d.ts'/>

module BLClient {

    export class WebSocketConnector {

        private socket: BLClient.Socket;
        private COMMAND: string = 'UPDATE';

        constructor(url: string) {
            this.socket = io(url);
        }

        listen() {
            this.socket.on(this.COMMAND, function(data: Message) {
                Logger.info(data);
            });
        }

    }

}