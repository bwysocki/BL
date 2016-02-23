declare module BLClient {
    export interface Message {
        name: string;
        message: string;
    }
    export interface Socket {
        on(event: string, callback: (data: Message) => void): void;
    }
    export interface Coordinate {
        x?: number;
        y?: number;
    }
}
declare var io: (url: string) => BLClient.Socket;

