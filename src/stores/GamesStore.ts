/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { GamesService } from "services/GamesService";
import type { RootStore } from "./RootStore";

export class GameStore {
    public isLoading = true;
    protected games: Game[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestGames();
        setInterval(() => this.requestGames(), 1000); // Fake realtime
    }

    public getGames(ids: number[]): Game[] {
        return this.games.filter(({ id }) => ids.includes(id));
    }

    private requestGames(): void {
        GamesService.getGames()
            .then((games) => runInAction(() => {
                this.isLoading = false;
                this.games = games;
            }))
            .catch((err) => {
                console.error(err);
                this.isLoading = false;
            });
    }
}
