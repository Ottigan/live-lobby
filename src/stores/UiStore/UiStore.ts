import { makeAutoObservable, observable, runInAction } from "mobx";
import { GridSize } from "types";

export class UiStore {
    public gridSize: GridSize = "md";
    public windowDimensions = {
        height: window.innerHeight,
        width: window.innerWidth,
    };

    public constructor() {
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
    }

    public setGridSize(value: GridSize): void {
        localStorage.setItem("gridSize", value);
        this.gridSize = value;
    }
}
