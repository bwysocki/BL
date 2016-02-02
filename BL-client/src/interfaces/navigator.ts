module BLClient {
    export interface Navigator {
        getUserMedia(
            options: { video?: boolean; audio?: boolean; },
            success: (stream: any) => void,
            error?: (error: string) => void
            ): void;
        webkitGetUserMedia(
            options: { video?: boolean; audio?: boolean; },
            success: (stream: any) => void,
            error?: (error: string) => void
            ): void;
        mozGetUserMedia(
            options: { video?: boolean; audio?: boolean; },
            success: (stream: any) => void,
            error?: (error: string) => void
            ): void;
        msGetUserMedia(
            options: { video?: boolean; audio?: boolean; },
            success: (stream: any) => void,
            error?: (error: string) => void
            ): void;
    }
}
