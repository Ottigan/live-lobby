const MAX_BLACKJACK_PLAYERS = 7;

class Db {
    public games = [
        {
            name: "Test",
            type: "roulette",
            players: 54,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
        },
        {
            name: "Foo",
            type: "roulette",
            players: 678,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
        },
        {
            name: "Bar",
            type: "roulette",
            players: 43,
            betLimits: {
                currency: "€",
                min: 0.50,
                max: 20,
            },
        },
        {
            name: "Fizz",
            type: "blackjack",
            players: 3,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Buzz",
            type: "blackjack",
            players: 5,
            betLimits: {
                currency: "€",
                min: 15,
                max: 20,
            },
        },
        {
            name: "Omicron",
            type: "roulette",
            players: 29,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
        },
    ];

    public constructor() {
        setInterval(() => this.updatePlayers(), 3000);
    }

    public async find(descriptor: OmitMethodNames<Db>) {
        return Promise.resolve(this[descriptor]);
    }

    private updatePlayers(): void {
        this.games.forEach((game, i) => {
            const { type, players } = game;

            const changes = Math.round(Math.random() * 10);

            if (Math.random() > 0.5) {
                const sum = players + changes;

                this.games[i].players = type === "blackjack" && sum > MAX_BLACKJACK_PLAYERS ? MAX_BLACKJACK_PLAYERS : sum;
            } else {
                this.games[i].players = changes > players ? 0 : players - changes;
            }
        });
    }
}

export const Database = new Db();
