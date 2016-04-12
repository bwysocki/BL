import {Injectable} from 'angular2/core';
import {VideoConfiguration} from '../angular-components/bl/bl';

@Injectable()
export class ServerService {

    public static INIT_COMMAND: string = 'INIT';
    public static URL: string = 'http://localhost:3001/updateinfo';
    public socket: Socket;

    constructor() {
        this.socket = io(ServerService.URL);
    }

    public listen(): Promise<VideoConfiguration> {
        return new Promise((resolve, reject) => {
            this.socket.on(ServerService.INIT_COMMAND, (data: Message) => {
                Logger.info('Used configuration: ', data);
                resolve(<VideoConfiguration>data);
            });
        });
    }
}
