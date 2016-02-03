module BLClient {
    export interface Message {
        name: string;
        message: string;
    }
    export interface Socket {
        on(event: string, callback: (data: Message) => void): void;
    }
}
declare var io: (url: string) => BLClient.Socket;

