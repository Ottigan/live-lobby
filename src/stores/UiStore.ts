import { makeAutoObservable, observable } from "mobx";
import type { RootStore } from "./RootStore";

export class UiStore {
    public gridSize = "5";
    public windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this, { windowDimensions: observable.struct });

        window.onresize = (e) => {
            this.windowDimensions = {
                width: (e.target as Window).innerWidth,
                height: (e.target as Window).innerHeight,
            };
        };

        const gridSize = localStorage.getItem("gridSize");

        if (gridSize) {
            this.setViewColumns(gridSize);
        }

        this.rootStore = rootStore;
    }

    public setViewColumns(value: string): void {
        localStorage.setItem("gridSize", value);
        this.gridSize = value;
    }
}
