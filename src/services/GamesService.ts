import { Database } from "db/Db";
import { GamesStore } from "stores/GamesStore";
import { BlackjackSeatIndex, Game, Store } from "types";

export class GamesService {
    private stores: Store[] = [];

    public constructor(stores: Store[]) {
        this.stores = stores;
    }

    public async getGames(): Promise<void> {
        const games = await Database.find("games") as Record<number, Game>;

        const gamesStore = this.stores.find((store) => store instanceof GamesStore) as GamesStore;
        gamesStore.games = games;
    }

    public async takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): Promise<boolean> {
        const result = await Database.takeBlackjackSeat(gameId, Number(seatIndex)) as boolean;

        return result;
    }
}
