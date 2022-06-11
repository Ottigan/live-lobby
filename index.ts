import http from "http";
import {Server } from "ws";
import { Database } from "./db/Db";

const server = http.createServer();

const wss = new Server({ server });

wss.on("connection", (ws, request) => {
    const { url } = request;

    switch (url) {
        case "/live-lobby":
            Database.initClient(ws);
            break;
        default:
            ws.terminate();
            break;
    }
});

server.listen(process.env.PORT || 1337, () => {
    console.log(`Server started`);
});
