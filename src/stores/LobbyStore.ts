import { makeAutoObservable } from "mobx";
import { LobbyService } from "services/LobbyService";
import type { RootStore } from "./RootStore";

export class LobbyStore {
    protected games: Game[] = [];

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestGames();
        setInterval(() => this.requestGames(), 1000); // Fake realtime
    }

    private requestGames(): void {
        LobbyService.getGames()
            .then((games) => games.forEach((game) => this.updateGame(game)))
            .catch(() => {});
    }

    private updateGame(game: Game) {
        const { name, players } = game;

        const index = this.games.findIndex((g) => g.name === name);
        const localGame = this.games[index];

        if (!localGame) {
            this.games.push(game);
        } else if (localGame.players !== players) {
            this.games[index] = game;
        }
    }

    public get blackjacks(): Game[] {
        return this.games.filter((game) => game.type === GameType.Blackjack);
    }

    public get roulettes(): Game[] {
        return this.games.filter((game) => game.type === GameType.Roulette);
    }
}
