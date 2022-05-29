import blackjackBg from "assets/blackjack-bg.jpg";
import rouletteBg from "assets/roulette-bg.jpg";
import largeGrid from "assets/large-grid.svg";
import mediumGrid from "assets/medium-grid.svg";
import smallGrid from "assets/small-grid.svg";

const MAX_BLACKJACK_PLAYERS = 7;

class Db {
    public games = [
        {
            id: 1,
            name: "Test",
            type: "roulette",
            players: 54,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
            online: false,
            opensAt: "2022-05-30T16:00:00.000Z",
            description: "",
            bgImage: rouletteBg as string,
            history: [],
        },
        {
            id: 2,
            name: "Foo",
            type: "roulette",
            players: 678,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
            online: true,
            description: "",
            bgImage: rouletteBg as string,
            history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
        },
        {
            id: 3,
            name: "Bar",
            type: "roulette",
            players: 43,
            betLimits: {
                currency: "€",
                min: 0.5,
                max: 20,
            },
            online: true,
            description: "",
            bgImage: rouletteBg as string,
            history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
        },
        {
            id: 4,
            name: "Fizz",
            type: "blackjack",
            players: 3,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
            online: true,
            description: "",
            bgImage: blackjackBg as string,
        },
        {
            id: 5,
            name: "Buzz",
            type: "blackjack",
            players: 5,
            betLimits: {
                currency: "€",
                min: 15,
                max: 20,
            },
            online: false,
            opensAt: "2022-05-30T15:00:00.000Z",
            description: "",
            bgImage: blackjackBg as string,
        },
        {
            id: 6,
            name: "Omicron",
            type: "roulette",
            players: 29,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
            online: false,
            opensAt: "2022-05-30T18:00:00.000Z",
            description: "",
            bgImage: rouletteBg as string,
            history: [],
        },
    ];

    public categories = [
        {
            name: "Blackjacks",
            path: "blackjack",
            descriptor: "blackjack",
            gameIds: [4, 5],
            bgColor: "#332424",
        },
        {
            name: "Roulettes",
            path: "roulette",
            descriptor: "roulette",
            gameIds: [1, 2, 3, 6],
            bgColor: "#3e3e53",
        },
    ];

    public widgets = {
        gridWidget: {
            name: "gridWidget",
            options: [
                {
                    size: "lg",
                    title: "Large grid",
                    image: largeGrid as string,

                },
                {
                    size: "md",
                    title: "Medium grid",
                    image: mediumGrid as string,
                },
                {
                    size: "sm",
                    title: "Small grid",
                    image: smallGrid as string,
                },
            ],
        },
    };

    public constructor() {
        setInterval(() => this.updatePlayers(), 3000);
    }

    // Simulating async query
    public async find(descriptor: OmitMethodNames<Db>): Promise<unknown> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this[descriptor]), Math.random() * 1000);
        });
    }

    private updatePlayers(): void {
        this.games.forEach((game, i) => {
            const { type, players } = game;

            const changes = Math.round(Math.random() * 10);

            if (Math.random() > 0.5) {
                const sum = players + changes;

                this.games[i].players =
          type === "blackjack" && sum > MAX_BLACKJACK_PLAYERS
              ? MAX_BLACKJACK_PLAYERS
              : sum;
            } else {
                this.games[i].players = changes > players ? 0 : players - changes;
            }
        });
    }
}

export const Database = new Db();
