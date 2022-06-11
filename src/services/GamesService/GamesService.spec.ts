/**
 * @jest-environment node
 */
import { BlackjackGame, BlackjackSeatData, GamePlayerData, Games, GameType, Stores } from "types";
import { GamesStore } from "stores/GamesStore";
import { LobbyTransport } from "transports";
import { GamesService } from "./GamesService";

jest.mock("utils", () => {
    return {
        b64toUrl: jest.fn(() => ""),
    };
});

describe("GamesService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("takeBlackjackSeat should work", () => {
        const transport = new LobbyTransport("");
        const spy = jest.spyOn(transport, "send");
        const gamesStore = new GamesStore();
        const stores = {
            GamesStore: gamesStore,
        } as Stores;
        const service = new GamesService(transport, stores);
        const gameId = 1;
        const seatIndex = "1";

        service.takeBlackjackSeat(gameId, seatIndex);
        expect(spy).toBeCalledWith("games_blackjack_seats", { gameId, seatIndex });
    });

    test("updateGames should work", () => {
        const gamesStore = new GamesStore();
        const stores = {
            GamesStore: gamesStore,
        } as Stores;

        const transport = new LobbyTransport("");

        const games: Games = {
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

        // eslint-disable-next-line no-new
        new GamesService(transport, stores);

        transport.emit("games", games);

        expect(gamesStore.games).toEqual(games);
    });

    test("updatePlayers should work", () => {
        const idOne = 1;
        const idFour = 4;
        const games: Games = {
            [idOne]: {
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
            },
            [idFour]: {
                id: idFour,
                name: "Pineapple on Pizza",
                type: GameType.Blackjack,
                players: 2,
                betLimits: {
                    currency: "€",
                    min: 5,
                    max: 100,
                },
                online: true,
                description: "",
                dealer: "Homer",
                language: "uk",
                bgImage: "",
                seats: {
                    1: false,
                    2: false,
                    3: true,
                    4: false,
                    5: true,
                    6: false,
                    7: false,
                },
            },
        };

        const gamesStore = new GamesStore();
        gamesStore.games = games;
        const stores = {
            GamesStore: gamesStore,
        } as Stores;

        const transport = new LobbyTransport("");

        // eslint-disable-next-line no-new
        new GamesService(transport, stores);

        const players = 70;
        const emitData: GamePlayerData[] = [
            { id: idOne, players },
        ];

        transport.emit("games_player_count", emitData);

        expect(gamesStore.games[idOne].players).toBe(players);
    });

    test("updateBlackjackSeats should work", () => {
        const idOne = 1;
        const idFour = 4;
        const games: Games = {
            [idOne]: {
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
            },
            [idFour]: {
                id: idFour,
                name: "Pineapple on Pizza",
                type: GameType.Blackjack,
                players: 2,
                betLimits: {
                    currency: "€",
                    min: 5,
                    max: 100,
                },
                online: true,
                description: "",
                dealer: "Homer",
                language: "uk",
                bgImage: "",
                seats: {
                    1: false,
                    2: false,
                    3: true,
                    4: false,
                    5: true,
                    6: false,
                    7: false,
                },
            },
        };
        const gamesStore = new GamesStore();
        gamesStore.games = games;
        const stores = {
            GamesStore: gamesStore,
        } as Stores;

        const transport = new LobbyTransport("");

        // eslint-disable-next-line no-new
        new GamesService(transport, stores);

        const players = 7;
        const invalidEmit: BlackjackSeatData = {
            id: idOne,
            players,
            seats: {
                1: false,
                2: false,
                3: true,
                4: false,
                5: true,
                6: false,
                7: false,
            },
        };

        transport.emit("games_blackjack_seats", invalidEmit);

        expect(gamesStore.games[idOne]).toEqual(games[idOne]);

        const seats = {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
        };
        const validEmit: BlackjackSeatData = {
            id: idFour,
            players,
            seats,
        };

        transport.emit("games_blackjack_seats", validEmit);

        expect(gamesStore.games[idFour].players).toBe(players);
        expect((gamesStore.games[idFour] as BlackjackGame).seats).toEqual(seats);
    });
});
