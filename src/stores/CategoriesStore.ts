/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { CategoriesService } from "services/CategoriesService";
import { Category } from "types";
import type { RootStore } from "./RootStore";

export class CategoriesStore {
    public isLoading = true;
    private _categories: Category[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestCategories();
    }

    public set categories(categories: Category[]) {
        this._categories = categories;
    }

    public get categories(): Category[] {
        return this._categories;
    }

    private requestCategories(): void {
        CategoriesService.getCategories()
            .then((categories) => {
                this.categories = categories;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => runInAction(() => {
                this.isLoading = false;
            }));
    }
}
