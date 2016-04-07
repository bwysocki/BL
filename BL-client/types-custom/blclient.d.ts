interface Message {
    model: number;
    fps: number;
    logoColor: string;
    threshold: number;
}
interface Socket {
    on(event: string, callback: (data: Message) => void): void;
}
interface Coordinate {
    x?: number;
    y?: number;
}
declare var io: (url: string) => Socket;

