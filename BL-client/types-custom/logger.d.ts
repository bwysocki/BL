declare module LoggerModule {

    export class LoggerInterface {
        static useDefaults: () => void;
        static debug: (...var_args: any[]) => void;
        static info: (...var_args: any[]) => void;
        static warn: (...var_args: any[]) => void;
        static error: (...var_args: any[]) => void;
    }

}

import Logger = LoggerModule.LoggerInterface;