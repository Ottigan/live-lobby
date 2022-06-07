import { makeAutoObservable } from "mobx";
import { UiStore } from "stores/UiStore/UiStore";
import { CategoriesStore } from "stores/CategoriesStore";
import { GamesStore } from "stores/GamesStore";
import { WidgetsStore } from "stores/WidgetsStore/WidgetsStore";
import { CategoriesService } from "services/CategoriesService/CategoriesService";
import { WidgetsService } from "services/WidgetsService/WidgetsService";
import { GamesService } from "services/GamesService/GamesService";

export class RootStore {
    public categoriesStore;
    public categoriesService;
    public gamesStore;
    public gamesService;
    public widgetsStore;
    public widgetsService;
    public uiStore;

    public constructor() {
        makeAutoObservable(this);
        this.categoriesStore = new CategoriesStore(this);
        this.gamesStore = new GamesStore(this);
        this.widgetsStore = new WidgetsStore(this);
        this.uiStore = new UiStore(this);

        const stores = [
            this.categoriesStore,
            this.gamesStore,
            this.widgetsStore,
            this.uiStore,
        ];

        this.categoriesService = new CategoriesService(stores);
        this.gamesService = new GamesService(stores);
        this.widgetsService = new WidgetsService(stores);
    }
}
