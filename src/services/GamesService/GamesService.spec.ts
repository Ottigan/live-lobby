/**
 * @jest-environment node
 */
import { RootStore } from "stores/RootStore";
import { GamesStore } from "stores/GamesStore";
import { GamesService } from "./GamesService";

const DB_FIND_RESPONSE = "data";
const DB_TAKE_BLACKJACK_SEAT_DEFAULT_RESPONSE = true;
const DB_TAKE_BLACKJACK_SEAT_FIRST_RESPONSE_RESPONSE = true;

jest.mock("db/Db", () => {
    return {
        Database: {
            find: jest.fn(() => {
                return DB_FIND_RESPONSE;
            }),
            takeBlackjackSeat: jest.fn(() => DB_TAKE_BLACKJACK_SEAT_DEFAULT_RESPONSE)
                .mockImplementationOnce(() => DB_TAKE_BLACKJACK_SEAT_FIRST_RESPONSE_RESPONSE),
        },
    };
});

describe("GamesService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getGames should update GamesStore", async () => {
        const rootStore = new RootStore();
        const gamesStore = new GamesStore(rootStore);

        const service = new GamesService([gamesStore]);

        expect(gamesStore.games).toEqual({});

        await service.getGames();
        expect(gamesStore.games).toEqual(DB_FIND_RESPONSE);
    });

    test("takeBlackjackSeat should return Database response", async () => {
        const service = new GamesService([]);
        const gameId = 1;
        const seatIndex = "1";

        const firstResult = await service.takeBlackjackSeat(gameId, seatIndex);
        expect(firstResult).toBe(DB_TAKE_BLACKJACK_SEAT_FIRST_RESPONSE_RESPONSE);

        const secondResult = await service.takeBlackjackSeat(gameId, seatIndex);
        expect(secondResult).toBe(DB_TAKE_BLACKJACK_SEAT_DEFAULT_RESPONSE);
    });
});
