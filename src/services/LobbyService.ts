import { Database } from "db/Db";
import { isGame } from "utils";

export class LobbyService {
    public static async getGames(): Promise<Game[]> {
        const games = await Database.find("games");

        // * Should I bother validating data from my own server, if yes, would this be how?
        const verifiedGames = games.filter(isGame);

        return verifiedGames;
    }
}
