/**
 * @jest-environment node
 */
import { RootStore } from "stores/RootStore";
import { CategoriesStore } from "stores/CategoriesStore";
import { CategoriesService } from "./CategoriesService";

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

describe("CategoriesService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getCategories should update CategoriesStore", async () => {
        const rootStore = new RootStore();
        const categoriesStore = new CategoriesStore(rootStore);

        const service = new CategoriesService([categoriesStore]);

        expect(categoriesStore.categories).toEqual([]);

        await service.getCategories();
        expect(categoriesStore.categories).toEqual(DB_RESPONSE);
    });
});
