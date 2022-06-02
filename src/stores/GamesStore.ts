/* eslint-disable no-console */
import { makeAutoObservable, runInAction } from "mobx";
import { GamesService } from "services/GamesService";
import { BlackjackGame, BlackjackSeatIndex, Filter, Game } from "types";
import type { RootStore } from "./RootStore";

export class GameStore {
    public isLoading = true;
    public search = "";
    public filter: Filter | null = null;
    private games: Record<number, Game> = {};

    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        this.requestGames();
        setInterval(() => this.requestGames(), 1000); // Fake realtime
    }

    public getGames(ids: number[]): Game[] {
        return Object.values(this.games).filter((game) => {
            const { id, name, betLimits, language } = game;

            const isIdMatch = ids.includes(id);
            const isFilterMatch = (() => {
                switch (this?.filter?.target) {
                    case "betLimits":
                        return betLimits.min >= this.filter.value;
                    case "language":
                        return language.code === this.filter.value;
                    default:
                        return true;
                }
            })();

            const isSearchMatch = new RegExp(`${this.search}`, "i").test(name);

            return isIdMatch && isFilterMatch && isSearchMatch;
        });
    }

    public handleFilter(filter: Filter): void {
        const currentTitle = this.filter?.title;

        if (currentTitle === filter.title) {
            this.filter = null;
        } else {
            this.filter = filter;
        }
    }

    public handleSearch(value: string): void {
        this.search = value;
    }

    public async takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): Promise<void> {
        const success = await GamesService.takeBlackjackSeat(gameId, seatIndex);

        if (success) {
            const game = this.games[gameId] as BlackjackGame;

            runInAction(() => {
                this.games[gameId] = {
                    ...game,
                    players: game.players + 1,
                    seats: {
                        ...game.seats,
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
