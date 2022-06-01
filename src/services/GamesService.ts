import { Database } from "db/Db";
import { BlackjackSeatIndex, Game } from "types";

export class GamesService {
    public static async getGames(): Promise<Record<number, Game>> {
        const games = await Database.find("games") as Record<number, Game>;

        return games;
    }

    public static async takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): Promise<boolean> {
        const result = await Database.takeBlackjackSeat(gameId, Number(seatIndex)) as boolean;

        return result;
    }
}
