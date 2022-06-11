/**
 * @jest-environment node
 */

import { Game, GameType } from "types";
import { GamesStore } from "./GamesStore";

jest.mock("utils", () => {
    return {
        b64toUrl: jest.fn(() => ""),
    };
});

describe("GamesStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set/get isLoading", () => {
        const store = new GamesStore();

        store.isLoading = false;
        expect(store.isLoading).toBe(false);
        store.isLoading = true;
        expect(store.isLoading).toBe(true);
    });

    it("should set/get games", () => {
        const games: Record<string, Game> = {
            1: {
                id: 1,
                name: "Testerino Halapenjo",
                type: GameType.Roulette,
                players: 54,
                betLimits: {
                    currency: "€",
                    min: 3,
                    max: 20,
                },
                online: false,
                opensAt: "",
                description: "",
                dealer: null,
                language: "uk",
                bgImage: "",
                history: [],
            },
        };

        const store = new GamesStore();
        expect(store.games).toEqual({});

        store.games = games;
        expect(store.games).toEqual(games);
    });

    test("getGames should work", () => {
        const idOne = 1;
        const gameOne: Game = {
            id: idOne,
            name: "Testerino Halapenjo",
            type: GameType.Roulette,
            players: 54,
            betLimits: {
                currency: "€",
                min: 3,
                max: 20,
            },
            online: false,
            opensAt: "",
            description: "",
            dealer: null,
            language: "uk",
            bgImage: "",
            history: [],
        };

        const idFive = 5;
        const gameFive: Game = {
            id: idFive,
            name: "All gods will die",
            type: GameType.Blackjack,
            players: 1,
            betLimits: {
                currency: "$",
                min: 1,
                max: 10,
            },
            online: false,
            opensAt: "",
            description: "",
            dealer: null,
            language: "de",
            bgImage: "",
            seats: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            },
        };

        const games: Record<string, Game> = {
            [idOne]: gameOne,
            [idFive]: gameFive,
        };

        const store = new GamesStore();
        store.games = games;

        expect(store.getGames([])).toEqual([]);
        expect(store.getGames([idOne])).toEqual([gameOne]);
        expect(store.getGames([idOne, idFive])).toEqual([gameOne, gameFive]);
    });

    it("should set/get filter", () => {
        const filter = {
            target: "",
            value: 1337,
            title: "leet",
        };

        const store = new GamesStore();

        store.filter = null;
        expect(store.filter).toBeNull();
        store.filter = filter;
        expect(store.filter).toEqual(filter);
        store.filter = filter;
        expect(store.filter).toBeNull();
    });

    it("should set/get search", () => {
        const searchValueOne = "Abrakadabra";
        const searchValueTwo = "";

        const store = new GamesStore();

        store.search = searchValueOne;
        expect(store.search).toMatch(searchValueOne);
        store.search = searchValueTwo;
        expect(store.search).toMatch(searchValueTwo);
    });

    test("isFilterMatch should work", () => {
        const betLimitsFilterOne = {
            target: "betLimits",
            value: 5,
            title: "5",
        };

        const gameId = 1;
        const game: Game = {
            id: gameId,
            name: "Testerino Halapenjo",
            type: GameType.Roulette,
            players: 54,
            betLimits: {
                currency: "€",
                min: 3,
                max: 20,
            },
            online: false,
            opensAt: "",
            description: "",
            dealer: null,
            language: "uk",
            bgImage: "",
            history: [],
        };
        const games: Record<string, Game> = {
            [gameId]: game,
        };

        const store = new GamesStore();

        store.filter = betLimitsFilterOne;
        store.games = games;
        expect(store.getGames([gameId])).toEqual([]);

        const betLimitsFilterTwo = {
            target: "language",
            value: "uk",
            title: "uk",
        };

        store.filter = betLimitsFilterTwo;
        expect(store.getGames([gameId])).toEqual([game]);
    });
});
