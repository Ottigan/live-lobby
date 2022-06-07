import { makeAutoObservable } from "mobx";
import { Widget } from "types";
import type { RootStore } from "stores/RootStore";

export class WidgetsStore {
    public _isLoading = true;
    protected _widgets: Widget[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set widgets(widgets: Widget[]) {
        this._widgets = widgets;
    }

    public get widgets(): Widget[] {
        return this._widgets;
    }
}
