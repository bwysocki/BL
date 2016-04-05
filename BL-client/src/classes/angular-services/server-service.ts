import {Injectable} from 'angular2/core';
import {WebSocketConnector} from '../websocket/web-socket-connector';

@Injectable()
export class ServerService {

    constructor() {
        
        const websocket: WebSocketConnector = new WebSocketConnector('http://localhost:3001/updateinfo');
        websocket.listen();

        
    }

}
