import { Env } from "types";

export {};

declare global {
    namespace NodeJS {

        interface ProcessEnv {
            LOCAL_BASENAME: number;
            GH_PAGES_BASENAME: string;
            NODE_ENV: Env;
        }
    }
}
