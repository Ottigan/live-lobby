import { LobbyTransport } from "transports";
import { Category, Stores } from "types";

export class CategoriesService {
    private transport: LobbyTransport;
    private stores: Stores;

    public constructor(transport: LobbyTransport, stores: Stores) {
        this.transport = transport;
        this.stores = stores;

        transport.on("categories", this.updateCategories);
        this.getCategories().catch((err) => console.error(err));
    }

    public async getCategories(): Promise<void> {
        const categories = await this.transport.fetchCategories();

        this.updateCategories(categories);
    }

    public updateCategories = (data: Category[]): void => {
        const { CategoriesStore } = this.stores;

        CategoriesStore.categories = data;
        CategoriesStore.isLoading = false;
    };
}
