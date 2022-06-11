import { makeAutoObservable } from "mobx";
import { Category } from "types";

export class CategoriesStore {
    private _isLoading = true;
    private _categories: Category[] = [];

    public constructor() {
        makeAutoObservable(this);
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set categories(categories: Category[]) {
        this._categories = categories;
    }

    public get categories(): Category[] {
        return this._categories;
    }
}
