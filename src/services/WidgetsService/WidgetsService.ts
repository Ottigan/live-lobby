import { LobbyTransport } from "transports";
import { Stores, Widget } from "types";

export class WidgetsService {
    private transport: LobbyTransport;
    private stores: Stores;

    public constructor(transport: LobbyTransport, stores: Stores) {
        this.transport = transport;
        this.stores = stores;

        transport.on("widgets", this.updateWidgets);
        this.getWidgets().catch((err) => console.error(err));
    }

    public async getWidgets(): Promise<void> {
        const widgets = await this.transport.fetchWidgets();

        this.updateWidgets(widgets);
    }

    public updateWidgets = (data: Widget[]): void => {
        const { WidgetsStore } = this.stores;

        WidgetsStore.widgets = data;
        WidgetsStore.isLoading = false;
    };
}
