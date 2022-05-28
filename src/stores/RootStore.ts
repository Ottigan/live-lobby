import { makeAutoObservable } from "mobx";
import { UiStore } from "./UiStore";
import { CategoriesStore } from "./CategoriesStore";
import { GameStore } from "./GamesStore";
import { WidgetsStore } from "./WidgetsStore";

export class RootStore {
    public categoriesStore;
    public gamesStore;
    public widgetsStore;
    public uiStore;

    public constructor() {
        makeAutoObservable(this);
        this.categoriesStore = new CategoriesStore(this);
        this.gamesStore = new GameStore(this);
        this.widgetsStore = new WidgetsStore(this);
        this.uiStore = new UiStore(this);
    }
}

export const store = new RootStore();
