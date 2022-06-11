/**
 * @jest-environment node
 */
import { WidgetsStore } from "stores/WidgetsStore";
import { LobbyTransport } from "transports";
import { Stores, Widget } from "types";
import { WidgetsService } from "./WidgetsService";

describe("WidgetsService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("updateWidgets should work", () => {
        const widgetsStore = new WidgetsStore();
        const stores = {
            WidgetsStore: widgetsStore,
        } as Stores;

        const transport = new LobbyTransport("");

        const widgets: Widget[] = [{
            name: "gridWidget",
            options: [
                {
                    size: "lg",
                    title: "Large grid",
                },
                {
                    size: "md",
                    title: "Medium grid",
                },
                {
                    size: "sm",
                    title: "Small grid",
                },
            ],
        }];

        // eslint-disable-next-line no-new
        new WidgetsService(transport, stores);

        expect(widgetsStore.widgets).toEqual([]);

        transport.emit("widgets", widgets);

        expect(widgetsStore.widgets).toEqual(widgets);
    });
});
