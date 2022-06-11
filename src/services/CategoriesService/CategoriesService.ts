import { LobbyTransport } from "transports";
import { Category, Stores } from "types";

export class CategoriesService {
    private transport: LobbyTransport;
    private stores: Stores;

    public constructor(transport: LobbyTransport, stores: Stores) {
        this.transport = transport;
        this.stores = stores;

        transport.on("categories", this.updateCategories);
    }

    public getCategories(): void {
        console.log("Hi");
    }

    public updateCategories = (data: Category[]): void => {
        const { CategoriesStore } = this.stores;

        CategoriesStore.categories = data;
        CategoriesStore.isLoading = false;
    };
}
