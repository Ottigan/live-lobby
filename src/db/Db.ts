import blackjackBg from "assets/blackjack-bg.jpg";
import rouletteBg from "assets/roulette-bg.jpg";
import largeGrid from "assets/large-grid.svg";
import mediumGrid from "assets/medium-grid.svg";
import smallGrid from "assets/small-grid.svg";
import ukFlag from "assets/uk.png";
import franceFlag from "assets/france.png";
import germanyFlag from "assets/germany.png";
import indiaFlag from "assets/india.png";
import { OmitMethodNames } from "types";
import { getRandomMomentInNext24h } from "utils";

type Id = number;

interface DbGame {
    id: Id;
    name: string;
    type: string;
    players: number;
    betLimits: {
        currency: string;
        min: number;
        max: number;
    };
    online: boolean;
    opensAt?: string;
    description: string;
    dealer: string | null;
    language: {
        code: string;
        image: string;
    };
    bgImage: string;
    history?: number[];
    seats?: Record<number, boolean>;
}

class Db {
    public games: Record<Id, DbGame> = {
        1: {
            id: 1,
            name: "Testerino Halapenjo",
            type: "roulette",
            players: 54,
            betLimits: {
                currency: "€",
                min: 3,
                max: 20,
            },
            online: false,
            opensAt: getRandomMomentInNext24h(),
            description: "",
            dealer: null,
            language: {
                code: "uk",
                image: ukFlag as string,
            },
            bgImage: rouletteBg as string,
            history: [],
        },
        2: {
            id: 2,
            name: "Foo Fighters",
            type: "roulette",
            players: 678,
            betLimits: {
                currency: "€",
                min: 1,
                max: 20,
            },
            online: true,
            description: "",
            dealer: "Nelson",
            language: {
                code: "uk",
                image: ukFlag as string,
            },
            bgImage: rouletteBg as string,
            history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
        },
        3: {
            id: 3,
            name: "Extremely long name",
            type: "roulette",
            players: 43,
            betLimits: {
                currency: "€",
                min: 0.5,
                max: 20,
            },
            online: true,
            description: "",
            dealer: "Bart",
            language: {
                code: "fr",
                image: franceFlag as string,
            },
            bgImage: rouletteBg as string,
            history: [0, 0, 10, 5, 33, 12, 18, 10, 5, 5],
        },
        4: {
            id: 4,
            name: "Pineapple on Pizza",
            type: "blackjack",
            players: 2,
            betLimits: {
                currency: "€",
                min: 5,
                max: 100,
            },
            online: true,
            description: "",
            dealer: "Homer",
            language: {
                code: "uk",
                image: ukFlag as string,
            },
            bgImage: blackjackBg as string,
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
        5: {
            id: 5,
            name: "FizzBuzz",
            type: "blackjack",
            players: 5,
            betLimits: {
                currency: "€",
                min: 15,
                max: 200,
            },
            online: false,
            opensAt: getRandomMomentInNext24h(),
            description: "",
            dealer: null,
            language: {
                code: "de",
                image: germanyFlag as string,
            },
            bgImage: blackjackBg as string,
            seats: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            },
        },
        6: {
            id: 6,
            name: "Omicron",
            type: "roulette",
            players: 29,
            betLimits: {
                currency: "€",
                min: 5,
                max: 2000,
            },
            online: false,
            opensAt: getRandomMomentInNext24h(),
            description: "",
            dealer: "Apu",
            language: {
                code: "in",
                image: indiaFlag as string,
            },
            bgImage: rouletteBg as string,
            history: [],
        },
    };

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
        filterWidget: {
            name: "filterWidget",
            options: [
                {
                    target: "betLimits",
                    value: 5,
                    title: "€ 5+",
                },
                {
                    target: "betLimits",
                    value: 1,
                    title: "€ 1+",
                },
                {
                    target: "language",
                    value: "uk",
                    title: "UK",
                },
                {
                    target: "language",
                    value: "de",
                    title: "DE",
                },
            ],
        },
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

        this.takeBlackjackSeat = this.takeBlackjackSeat.bind(this);
    }

    // Simulating async query
    public async find(descriptor: OmitMethodNames<Db>): Promise<unknown> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this[descriptor]), Math.random() * 1000);
        });
    }

    public async takeBlackjackSeat(gameId: Id, seatIndex: number): Promise<unknown> {
        // Verifying if seat is empty
        const result = await new Promise<boolean>((resolve) => {
            setTimeout(() => {
                return resolve(this.games[gameId]?.seats?.[seatIndex] === false);
            }, Math.random() * 1000);
        });

        if (result) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.games[gameId].seats![seatIndex] = true;
            this.games[gameId].players++;
        }

        return result;
    }

    private updatePlayers(): void {
        Object.values(this.games).forEach((game) => {
            const { id, type, players } = game;

            const changes = Math.round(Math.random() * 10);

            if (type === "roulette") {
                if (Math.random() > 0.5) {
                    this.games[id].players = players + changes;
                } else {
                    this.games[id].players = changes > players ? 0 : players - changes;
                }
            }
        });
    }
}

export const Database = new Db();
