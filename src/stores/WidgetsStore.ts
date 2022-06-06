/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { WidgetsService } from "services/WidgetsService";
import { Widget } from "types";
import type { RootStore } from "./RootStore";

export class WidgetsStore {
    public isLoading = true;
    protected _widgets: Widget[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestWidgets();
    }

    public set widgets(widgets: Widget[]) {
        this._widgets = widgets;
    }

    public get widgets(): Widget[] {
        return this._widgets;
    }

    private requestWidgets(): void {
        WidgetsService.getWidgets()
            .then((widgets) => {
                this.widgets = widgets;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => runInAction(() => {
                this.isLoading = false;
            }));
    }
}
