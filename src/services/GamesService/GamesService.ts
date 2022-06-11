import { LobbyTransport } from "transports";
import { BlackjackSeatData, BlackjackSeatIndex, GamePlayerData, Games, Stores } from "types";

export class GamesService {
    private transport: LobbyTransport;
    private stores: Stores;

    public constructor(transport: LobbyTransport, stores: Stores) {
        this.transport = transport;
        this.stores = stores;

        transport.on("games", this.updateGames);
        transport.on("games_player_count", this.updatePlayers);
        transport.on("games_blackjack_seats", this.updateBlackjackSeats);
        this.getGames().catch((err) => console.error(err));
    }

    public async getGames(): Promise<void> {
        const games = await this.transport.fetchGames();

        this.updateGames(games);
    }

    public takeBlackjackSeat(gameId: number, seatIndex: BlackjackSeatIndex): void {
        this.transport.send("games_blackjack_seats", { gameId, seatIndex });
    }

    public updateGames = (data: Games): void => {
        const { GamesStore } = this.stores;

        GamesStore.games = data;
        GamesStore.isLoading = false;
    };

    public updatePlayers = (data: GamePlayerData[]): void => {
        const { GamesStore } = this.stores;

        GamesStore.players = data;
    };

    public updateBlackjackSeats = (data: BlackjackSeatData): void => {
        const { GamesStore } = this.stores;

        GamesStore.seats = data;
    };
}
