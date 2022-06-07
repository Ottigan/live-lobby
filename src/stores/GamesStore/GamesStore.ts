import { makeAutoObservable } from "mobx";
import { Filter, Game } from "types";
import type { RootStore } from "stores/RootStore";

export class GamesStore {
    public _search = "";
    public _filter: Filter = null;
    private _games: Record<number, Game> = {};
    private _isLoading = true;
    private rootStore;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set games(games: Record<number, Game>) {
        this._games = games;
    }

    public get games(): Record<number, Game> {
        return this._games;
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
                return language.code === this.filter.value;
            default:
                return true;
        }
    }

    protected isSearchMatch(game: Game): boolean {
        return new RegExp(`${this.search}`, "i").test(game.name);
    }
}
