/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { GamesService } from "services/GamesService";
import { BlackjackGame, BlackjackSeatIndex, Game } from "types";
import type { RootStore } from "./RootStore";

export class GameStore {
    public isLoading = true;
    protected games: Record<number, Game> = {};

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestGames();
        setInterval(() => this.requestGames(), 1000); // Fake realtime
    }

    public getGames(ids: number[]): Game[] {
        return Object.values(this.games).filter(({ id }) => ids.includes(id));
    }

    public async takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): Promise<void> {
        const success = await GamesService.takeBlackjackSeat(gameId, seatIndex);

        if (success) {
            runInAction(() => {
                (this.games[gameId] as BlackjackGame) = {
                    ...(this.games[gameId] as BlackjackGame),
                    seats: {
                        ...(this.games[gameId] as BlackjackGame).seats,
                        [seatIndex]: true,
                    },
                };
            });
        }
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
