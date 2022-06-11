import { makeAutoObservable } from "mobx";
import { Widget } from "types";

export class WidgetsStore {
    public _isLoading = true;
    protected _widgets: Widget[] = [];

    public constructor() {
        makeAutoObservable(this);
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
