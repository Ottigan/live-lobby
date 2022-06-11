import WebSocket from "ws";
import EventEmitter from "events";

interface Request {
    type: string;
    data: object;
}

interface ExtendedWebSocket extends WebSocket {
    id: number;
    isAlive: boolean;
}

export class Watcher extends EventEmitter {
    protected clients: Record<number, ExtendedWebSocket> = {};
    private specialId = 1;

    protected constructor() {
        super();
        this.clients = {};

        setInterval(() => this.validateClients(), 5000);
        this.validateClients = this.validateClients.bind(this);
    }

    protected appendClient(client: WebSocket): void {
        const extendedClient = client as ExtendedWebSocket;
        extendedClient.id = this.getValidClientId();
        extendedClient.isAlive = true;
        extendedClient.onmessage = this.onmessage;
        extendedClient.onclose = () => extendedClient.terminate();

        // eslint-disable-next-line func-names
        extendedClient.on("pong", function () {
            (this as ExtendedWebSocket).isAlive = true;
        });

        this.clients[extendedClient.id] = extendedClient;
    }

    protected sendToAll<T>(data: T): void {
        const strData = JSON.stringify(data);

        Object.values(this.clients).forEach((client) => {
            client.send(strData);
        });
    }

    private onmessage = (event: WebSocket.MessageEvent): void => {
        const { type, data } = JSON.parse(event.data as string) as Request;

        this.emit(type, data);
    };

    private getValidClientId() {
        const id = this.specialId;
        this.specialId++;

        return id;
    }

    private validateClients() {
        Object.keys(this.clients).forEach((clientId: string): void => {
            const client = this.clients[Number(clientId)];

            if (!client.isAlive) {
                client.terminate();
                delete this.clients[Number(clientId)];
            } else {
                client.isAlive = false;
                client.ping();
            }
        });
    }
}
