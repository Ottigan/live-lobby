import { Env } from "types";

export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: Env;
            SERVER: string;
            WEBSOCKET: string;
        }
    }
}
