import { Database } from "db/Db";
import { CategoriesStore } from "stores/CategoriesStore";
import { Category, Store } from "types";

export class CategoriesService {
    private stores: Store[] = [];

    public constructor(stores: Store[]) {
        this.stores = stores;
    }

    public async getCategories(): Promise<void> {
        const categories = await Database.find("categories") as Category[];

        const categoriesStore = this.stores.find((store) => store instanceof CategoriesStore) as CategoriesStore;
        categoriesStore.categories = categories;
    }
}
