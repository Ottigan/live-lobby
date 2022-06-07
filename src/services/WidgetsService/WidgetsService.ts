import { Database } from "db/Db";
import { WidgetsStore } from "stores/WidgetsStore";
import { Store, Widget } from "types";

export class WidgetsService {
    private stores: Store[] = [];

    public constructor(stores: Store[]) {
        this.stores = stores;
    }

    public async getWidgets(): Promise<void> {
        const widgets = await Database.find("widgets") as Widget[];

        const store = this.stores.find((s) => s instanceof WidgetsStore);

        if (store) {
            (store as WidgetsStore).widgets = widgets;
        }
    }
}
