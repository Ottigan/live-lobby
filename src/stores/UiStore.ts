import { makeAutoObservable, observable, runInAction } from "mobx";
import { GridSize } from "types";
import type { RootStore } from "./RootStore";

export class UiStore {
    public gridSize: GridSize = "md";
    public windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this, { windowDimensions: observable.struct });

        window.onresize = (e) => {
            runInAction(() => {
                this.windowDimensions = {
                    width: (e.target as Window).innerWidth,
                    height: (e.target as Window).innerHeight,
                };
            });
        };

        const gridSize = localStorage.getItem("gridSize");

        if (gridSize && ["lg", "md", "sm"].includes(gridSize)) {
            this.setGridSize((gridSize as GridSize));
        }

        this.rootStore = rootStore;
    }

    public setGridSize(value: GridSize): void {
        localStorage.setItem("gridSize", value);
        this.gridSize = value;
    }
}
