import { Env } from "types";

export {};

declare global {
    namespace NodeJS {

        interface ProcessEnv {
            BASENAME: string;
            NODE_ENV: Env;
        }
    }
}
