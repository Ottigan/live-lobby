/**
 * @jest-environment node
 */
import { RootStore } from "stores/RootStore";
import { WidgetsStore } from "stores/WidgetsStore";
import { WidgetsService } from "./WidgetsService";

const DB_RESPONSE = "data";

jest.mock("db/Db", () => {
    return {
        Database: {
            find: jest.fn(() => {
                return DB_RESPONSE;
            }),
        },
    };
});

describe("WidgetsService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getWidgets should update WidgetsStore", async () => {
        const rootStore = new RootStore();
        const widgetsStore = new WidgetsStore(rootStore);

        const service = new WidgetsService([widgetsStore]);

        expect(widgetsStore.widgets).toEqual([]);

        await service.getWidgets();
        expect(widgetsStore.widgets).toEqual(DB_RESPONSE);
    });
});
