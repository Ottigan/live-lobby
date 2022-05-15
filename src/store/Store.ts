import { makeAutoObservable } from "mobx";

export class Store {
    public games: Game[] = [
        {
            name: "Test",
            players: 54,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Foo",
            players: 678,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Bar",
            players: 43,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Fizz",
            players: 13,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Buzz",
            players: 5,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
        {
            name: "Omicron",
            players: 29,
            betLimits: {
                currency: "€",
                min: 5,
                max: 20,
            },
        },
    ];

    public constructor() {
        makeAutoObservable(this);

        setInterval(() => this.updatePlayers(), 3000);
    }

    protected updatePlayers(): void {
        this.games.forEach((game, i) => {
            const { players } = game;

            const changes = Math.floor(Math.random() * 10);

            if (Math.random() > 0.5) {
                this.games[i].players = players + changes;
            } else {
                this.games[i].players = changes > players ? 0 : players - changes;
            }
        });
    }
}

export const store = new Store();
