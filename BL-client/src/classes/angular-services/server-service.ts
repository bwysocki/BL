import {Injectable} from 'angular2/core';
import {VideoConfiguration} from '../angular-components/bl/bl';

@Injectable()
export class ServerService {

    private socket: Socket;
    private INIT_COMMAND: string = 'INIT';

    constructor() {
        this.socket = io('http://localhost:3001/updateinfo');
    }

    public listen(): Promise<VideoConfiguration> {
        return new Promise((resolve, reject) => {
            this.socket.on(this.INIT_COMMAND, function (data: Message) {
                Logger.info('Used configuration: ', data);
                resolve(<VideoConfiguration>data);
            });
        });
    }
}
