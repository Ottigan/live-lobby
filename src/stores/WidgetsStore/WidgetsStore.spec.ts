/**
 * @jest-environment node
 */
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
        const store = new WidgetsStore();

        store.isLoading = false;
        expect(store.isLoading).toBe(false);
        store.isLoading = true;
        expect(store.isLoading).toBe(true);
    });

    it("should set/get widgets", () => {
        const widgets: Widget[] = [{
            name: "searchWidget",
        }];

        const store = new WidgetsStore();
        expect(store.widgets).toEqual([]);

        store.widgets = widgets;
        expect(store.widgets).toEqual(widgets);
    });
});
