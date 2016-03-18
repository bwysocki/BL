interface Message {
    name: string;
    message: string;
}
interface Socket {
    on(event: string, callback: (data: Message) => void): void;
}
interface Coordinate {
    x?: number;
    y?: number;
}
declare var io: (url: string) => Socket;

