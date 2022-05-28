/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { WidgetsService } from "services/WidgetsService";
import type { RootStore } from "./RootStore";

export class WidgetsStore {
    public isLoading = true;
    protected widgets: Record<string, Widget> = {};

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestWidgets();
        setInterval(() => this.requestWidgets(), 1000); // Fake realtime
    }

    public getWidgets(): Widget[] {
        return Object.keys(this.widgets).map((key) => this.widgets[key]);
    }

    private requestWidgets(): void {
        WidgetsService.getWidgets()
            .then((widgets) => runInAction(() => {
                this.isLoading = false;
                this.widgets = widgets;
            }))
            .catch((err) => console.error(err));
    }
}
