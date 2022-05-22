import { makeAutoObservable } from "mobx";
import { GridSize } from "../types";
import type { RootStore } from "./RootStore";

export class UiStore {
    public gridSize: GridSize = GridSize.Large;
    public gridSizeValue = "5";
    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);

        const gridSize = localStorage.getItem("gridSize");

        if (gridSize) {
            this.setViewColumns((gridSize as GridSize));
        }

        this.rootStore = rootStore;
    }

    public setViewColumns(value: GridSize): void {
        localStorage.setItem("gridSize", value);

        switch (value) {
            case GridSize.Large:
                this.gridSize = value;
                this.gridSizeValue = "5";
                break;
            case GridSize.Medium:
                this.gridSize = value;
                this.gridSizeValue = "6";
                break;
            case GridSize.Small:
                this.gridSize = value;
                this.gridSizeValue = "8";
                break;
            default:
                break;
        }
    }
}
