/**
 * @jest-environment node
 */
import { RootStore } from "stores/RootStore";
import { Widget } from "types";
import { WidgetsStore } from "./WidgetsStore";

describe("WidgetsStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set/get isLoading", () => {
        const rootStore = new RootStore();

        const store = new WidgetsStore(rootStore);

        store.isLoading = false;
        expect(store.isLoading).toBe(false);
        store.isLoading = true;
        expect(store.isLoading).toBe(true);
    });

    it("should set/get widgets", () => {
        const rootStore = new RootStore(); // mocked from __mocks__/RootStore;
        const widgets: Widget[] = [{
            name: "searchWidget",
        }];

        const store = new WidgetsStore(rootStore);
        expect(store.widgets).toEqual([]);

        store.widgets = widgets;
        expect(store.widgets).toEqual(widgets);
    });
});
