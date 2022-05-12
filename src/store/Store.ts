import { makeAutoObservable } from "mobx";

class Store {
    public name = "foo";

    public constructor() {
        makeAutoObservable(this);
    }

    public changeTest(): void {
        this.name = "bar";
    }
}

export const store = new Store();
