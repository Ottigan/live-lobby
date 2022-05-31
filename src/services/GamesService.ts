import { Database } from "db/Db";
import { Game } from "types";
import { isGame } from "utils";

export class GamesService {
    public static async getGames(): Promise<Game[]> {
        const games = await Database.find("games");

        const verifiedGames = Array.isArray(games) ? games.filter(isGame) : [];

        return verifiedGames;
    }
}
