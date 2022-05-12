import { makeAutoObservable } from "mobx";

export class Store {
    public name = "";

    public constructor(name: string) {
        makeAutoObservable(this);

        this.name = name;
    }

    public changeTest(): void {
        this.name = "bar";
    }
}
