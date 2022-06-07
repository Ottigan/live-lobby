/**
 * @jest-environment node
 */
import { RootStore } from "stores/RootStore";
import { CategoriesStore } from "./CategoriesStore";

describe("CategoriesStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set/get isLoading", () => {
        const rootStore = new RootStore();

        const store = new CategoriesStore(rootStore);

        store.isLoading = false;
        expect(store.isLoading).toBe(false);
        store.isLoading = true;
        expect(store.isLoading).toBe(true);
    });

    it("should set/get categories", () => {
        const rootStore = new RootStore(); // mocked from __mocks__/RootStore;
        const categories = [{
            name: "Blackjacks",
            path: "blackjack",
            descriptor: "blackjack",
            gameIds: [4, 5],
            bgColor: "#332424",
        }];

        const store = new CategoriesStore(rootStore);
        expect(store.categories).toEqual([]);

        store.categories = categories;
        expect(store.categories).toEqual(categories);
    });
});
