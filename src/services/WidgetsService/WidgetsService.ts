import { LobbyTransport } from "transports";
import { Stores, Widget } from "types";

export class WidgetsService {
    private transport: LobbyTransport;
    private stores: Stores;

    public constructor(transport: LobbyTransport, stores: Stores) {
        this.transport = transport;
        this.stores = stores;

        transport.on("widgets", this.updateWidgets);
    }

    public getWidgets(): void {
        console.log("Hi");
    }

    public updateWidgets = (data: Widget[]): void => {
        const { WidgetsStore } = this.stores;

        WidgetsStore.widgets = data;
        WidgetsStore.isLoading = false;
    };
}
