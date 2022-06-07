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

        const store = this.stores.find((s) => s instanceof GamesStore);

        if (store) {
            (store as GamesStore).games = games;
        }
    }

    public async takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): Promise<boolean> {
        return Database.takeBlackjackSeat(gameId, Number(seatIndex)) as Promise<boolean>;
    }
}
