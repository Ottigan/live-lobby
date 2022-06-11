/**
 * @jest-environment node
 */
import { CategoriesStore } from "./CategoriesStore";

describe("CategoriesStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set/get isLoading", () => {
        const store = new CategoriesStore();

        store.isLoading = false;
        expect(store.isLoading).toBe(false);
        store.isLoading = true;
        expect(store.isLoading).toBe(true);
    });

    it("should set/get categories", () => {
        const categories = [{
            name: "Blackjacks",
            path: "blackjack",
            descriptor: "blackjack",
            gameIds: [4, 5],
            bgColor: "#332424",
        }];

        const store = new CategoriesStore();
        expect(store.categories).toEqual([]);

        store.categories = categories;
        expect(store.categories).toEqual(categories);
    });
});
