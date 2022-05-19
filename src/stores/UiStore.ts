import type { RootStore } from "./RootStore";

export class UiStore {
    private rootStore;

    public constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
