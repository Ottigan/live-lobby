import baccaratBg from "assets/baccarat-bg.jpg";
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
    history?: number[] | [string, string, string, string, string, string][];
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
                image: ukFlag,
            },
            bgImage: rouletteBg,
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
                image: ukFlag,
            },
            bgImage: rouletteBg,
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
                image: franceFlag,
            },
            bgImage: rouletteBg,
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
                image: ukFlag,
            },
            bgImage: blackjackBg,
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
                image: germanyFlag,
            },
            bgImage: blackjackBg,
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
            dealer: null,
            language: {
                code: "in",
                image: indiaFlag,
            },
            bgImage: rouletteBg,
            history: [],
        },
        7: {
            id: 7,
            name: "Adult Tic Tac Toe",
            type: "baccarat",
            players: 29,
            betLimits: {
                currency: "€",
                min: 5,
                max: 2000,
            },
            online: true,
            description: "",
            dealer: "Ultron",
            language: {
                code: "uk",
                image: ukFlag,
            },
            bgImage: baccaratBg,
            history: [
                ["banker", "banker", "banker", "", "", ""],
                ["player", "player", "playerTie", "", "", ""],
                ["banker", "bankerTie", "bankerTie", "", "", ""],
                ["player", "", "", "", "", ""],
                ["banker", "banker", "banker", "banker", "", ""],
                ["player", "player", "", "", "", ""],
                ["banker", "banker", "banker", "banker", "banker", "banker"],
                ["player", "player", "", "", "", "banker"],
                ["banker", "", "", "", "", "banker"],
                ["player", "playerTie", "playerTie", "", "", ""],
                ["banker", "banker", "", "", "", ""],
                ["playerTie", "player", "player", "", "", ""],
                ["banker", "banker", "banker", "banker", "banker", "banker"],
                ["player", "player", "", "", "", ""],
                ["banker", "banker", "banker", "", "", ""],
                ["player", "", "", "", "", ""],
                ["banker", "banker", "banker", "banker", "banker", "banker"],
                ["player", "playerTie", "player", "", "", ""],
                ["banker", "banker", "", "", "", ""],
                ["player", "player", "", "", "", ""],
                ["banker", "banker", "banker", "banker", "banker", ""],
                ["player", "", "", "", "", ""],
                ["banker", "banker", "banker", "banker", "banker", "banker"],
                ["playerTie", "player", "", "", "", ""],
                ["banker", "banker", "", "", "", ""],
                ["player", "player", "player", "player", "player", "playerTie"],
                ["", "", "", "", "", "player"],
                ["", "", "", "", "", "player"],
                ["", "", "", "", "", "player"],
                ["", "", "", "", "", ""],
            ],
        },
    };

    public categories = [
        {
            name: "Baccarat",
            path: "baccarat",
            descriptor: "baccarat",
            gameIds: [7],
            bgColor: "#3f3050",
        },
        {
            name: "Blackjack",
            path: "blackjack",
            descriptor: "blackjack",
            gameIds: [4, 5],
            bgColor: "#332424",
        },
        {
            name: "Roulette",
            path: "roulette",
            descriptor: "roulette",
            gameIds: [1, 2, 3, 6],
            bgColor: "#3e3e53",
        },
    ];

    public widgets = [
        {
            name: "searchWidget",
        },
        {
            name: "filterWidget",
            options: [
                {
                    target: "betLimits",
                    value: 10,
                    title: "€ 10+",
                },
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
        {
            name: "gridWidget",
            options: [
                {
                    size: "lg",
                    title: "Large grid",
                    image: largeGrid,
                },
                {
                    size: "md",
                    title: "Medium grid",
                    image: mediumGrid,
                },
                {
                    size: "sm",
                    title: "Small grid",
                    image: smallGrid,
                },
            ],
        },
    ];

    public constructor() {
        setInterval(() => this.updatePlayers(), 3000);
        setTimeout(() => this.addPromoCategory(), 3000 + Math.random() * 2000);
    }

    // Simulating async query
    public async find(descriptor: OmitMethodNames<Db>): Promise<unknown> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this[descriptor]), Math.random() * 1000);
        });
    }

    public async takeBlackjackSeat(gameId: Id, seatIndex: number): Promise<unknown> {
        // Updating seat status by reference and returning outcome
        const isSuccess = new Promise<boolean>((resolve) => {
            setTimeout(() => {
                const game = this.games[gameId];
                const seats = game.seats;

                if (seats && seats[seatIndex] === false) {
                    seats[seatIndex] = true;
                    game.players++;

                    resolve(true);
                }

                resolve(false);
            }, Math.random() * 1000);
        });

        return isSuccess;
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

    private addPromoCategory(): void {
        const promoCategory = {
            name: "Promotion",
            path: "promotion",
            descriptor: "promo",
            gameIds: [7, 3, 4],
            bgColor: "#14474d",
        };

        this.categories.push(promoCategory);
    }
}

export const Database = new Db();
