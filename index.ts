import http from "http";
import WebSocket from "ws";
import { Database } from "./db/Db";

const server = http.createServer();

const wss = new WebSocket.Server({ noServer: true });

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

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
