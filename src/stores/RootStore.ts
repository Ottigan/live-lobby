import { makeAutoObservable } from "mobx";
import { UiStore } from "./UiStore";
import { LobbyStore } from "./LobbyStore";

export class RootStore {
    public lobbyStore;
    public uiStore;
    public categories = [
        { name: "Roulettes", path: "roulette" },
        { name: "Blackjacks", path: "blackjack" },
    ];

    public constructor() {
        makeAutoObservable(this);
        this.lobbyStore = new LobbyStore(this);
        this.uiStore = new UiStore(this);
    }
}

export const store = new RootStore();
