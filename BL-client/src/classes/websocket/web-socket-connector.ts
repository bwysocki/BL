export class WebSocketConnector {

    private socket: Socket;
    private COMMAND: string = 'UPDATE';

    constructor(url: string) {
        this.socket = io(url);
    }

    public listen() {
        this.socket.on(this.COMMAND, function(data: Message) {
            Logger.info(data);
        });
    }

}

