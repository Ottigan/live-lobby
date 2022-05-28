/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { CategoriesService } from "services/CategoriesService";
import type { RootStore } from "./RootStore";

export class CategoriesStore {
    public isLoading = true;
    public categories: Category[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestCategories();
        setInterval(() => this.requestCategories(), 1000); // Fake realtime
    }

    private requestCategories(): void {
        CategoriesService.getCategories()
            .then((categories) => {
                runInAction(() => {
                    this.isLoading = false;
                    this.categories = categories;
                });
            })
            .catch((err) => console.error(err));
    }
}
