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

    test("getWidgets should work", async () => {
        const widgetsStore = new WidgetsStore();
        const stores = {
            WidgetsStore: widgetsStore,
        } as Stores;

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

        const transport = new LobbyTransport("");
        jest.spyOn(transport, "fetchWidgets").mockImplementation(() => Promise.reject(Error("Error")));

        const service = new WidgetsService(transport, stores);
        const spy = jest.spyOn(service, "updateWidgets");

        expect(spy).not.toBeCalled();

        jest.spyOn(transport, "fetchWidgets").mockImplementation(() => Promise.resolve(widgets));
        await service.getWidgets();

        expect(spy).toBeCalledWith(widgets);
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
