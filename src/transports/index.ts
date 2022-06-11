import { Category, Games, TransportResponse, Widget } from "types";
import EventEmitter from "events";

export class LobbyTransport extends EventEmitter {
    private socket: WebSocket | null = null;
    private url: string;

    public constructor(url: string) {
        super();

        this.url = url;

        this.connect();
    }

    public connect(): void {
        const socket = new WebSocket(this.url);
        socket.onmessage = this.onmessage;
        socket.onclose = this.onclose;

        this.socket = socket;
    }

    public close(): void {
        if (this.socket) {
            this.socket.onmessage = null;
            this.socket.onclose = null;
            this.socket.close();
        }
    }

    public send<A extends string, K extends object>(type: A, data: K): void {
        const strData = JSON.stringify({ type, data });

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(strData);
        }
    }

    public async fetchCategories(): Promise<Category[]> {
        return fetch(`${process.env.SERVER}/categories`)
            .then((res) => res.json())
            .then((categories: Category[]) => categories)
            .catch((err) => {
                console.error(err);

                return [];
            });
    }

    public async fetchGames(): Promise<Games> {
        return fetch(`${process.env.SERVER}/games`)
            .then((res) => res.json())
            .then((games: Games) => games)
            .catch((err) => {
                console.error(err);

                return {};
            });
    }

    public async fetchWidgets(): Promise<Widget[]> {
        return fetch(`${process.env.SERVER}/widgets`)
            .then((res) => res.json())
            .then((widgets: Widget[]) => widgets)
            .catch((err) => {
                console.error(err);

                return [];
            });
    }

    private onmessage = (res: MessageEvent<string>) => {
        const { status, data } = JSON.parse(res.data) as TransportResponse;

        this.emit(status, data);
    };

    private onclose = () => this.connect();
}
