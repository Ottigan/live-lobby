/**
 * @jest-environment node
 */
import { CategoriesStore } from "stores/CategoriesStore";
import { Category, Stores } from "types";
import { LobbyTransport } from "transports";
import { CategoriesService } from "./CategoriesService";

describe("CategoriesService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getCategories should work", async () => {
        const categoriesStore = new CategoriesStore();
        const stores = {
            CategoriesStore: categoriesStore,
        } as Stores;

        const categories: Category[] = [{
            name: "Baccarat",
            path: "baccarat",
            descriptor: "baccarat",
            gameIds: [7],
            bgColor: "#3f3050",
        }];

        const transport = new LobbyTransport("");
        jest.spyOn(transport, "fetchCategories").mockImplementation(() => Promise.reject(Error("Error")));

        const service = new CategoriesService(transport, stores);
        const spy = jest.spyOn(service, "updateCategories");

        expect(spy).not.toBeCalled();

        jest.spyOn(transport, "fetchCategories").mockImplementation(() => Promise.resolve(categories));
        await service.getCategories();

        expect(spy).toBeCalledWith(categories);
    });

    test("updateCategories should work", () => {
        const categoriesStore = new CategoriesStore();
        const stores = {
            CategoriesStore: categoriesStore,
        } as Stores;

        const transport = new LobbyTransport("");

        const categories: Category[] = [{
            name: "Baccarat",
            path: "baccarat",
            descriptor: "baccarat",
            gameIds: [7],
            bgColor: "#3f3050",
        }];

        // eslint-disable-next-line no-new
        new CategoriesService(transport, stores);

        transport.emit("categories", categories);

        expect(categoriesStore.categories).toEqual(categories);
    });
});
