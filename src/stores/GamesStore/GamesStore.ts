import { makeAutoObservable } from "mobx";
import { BlackjackSeatData, Filter, Game, GamePlayerData, Games, GameType } from "types";
import { b64toUrl } from "utils";

export class GamesStore {
    public _search = "";
    public _filter: Filter = null;
    private _games: Games = {};
    private _isLoading = true;

    public constructor() {
        makeAutoObservable(this);
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set games(games: Games) {
        this._games = Object.values(games).reduce((acc, game) => {
            const { id, bgImage } = game;

            return {
                ...acc,
                [id]: {
                    ...game,
                    bgImage: b64toUrl(bgImage),
                },
            };
        }, {});
    }

    public get games(): Games {
        return this._games;
    }

    public set players(data: GamePlayerData[]) {
        data.forEach((x) => {
            const { id, players } = x;

            this._games[id].players = players;
        });
    }

    public set seats(data: BlackjackSeatData) {
        const { id, seats, players } = data;

        const game = this._games[id];

        if (game.type === GameType.Blackjack) {
            game.players = players;
            game.seats = seats;
        }
    }

    public getGames(ids: number[]): Game[] {
        return Object.values(this._games).filter((game) => {
            return ids.includes(game.id) && this.isFilterMatch(game) && this.isSearchMatch(game);
        });
    }

    public set filter(filter: Filter) {
        const currentTitle = this.filter?.title;

        if (currentTitle === filter?.title) {
            this._filter = null;
        } else {
            this._filter = filter;
        }
    }

    public get filter(): Filter {
        return this._filter;
    }

    public set search(value: string) {
        this._search = value;
    }

    public get search(): string {
        return this._search;
    }

    protected isFilterMatch(game: Game): boolean {
        const { betLimits, language } = game;

        switch (this.filter?.target) {
            case "betLimits":
                return betLimits.min >= this.filter.value;
            case "language":
                return language === this.filter.value;
            default:
                return true;
        }
    }

    protected isSearchMatch(game: Game): boolean {
        return new RegExp(`${this.search}`, "i").test(game.name);
    }
}
