import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Game, GameType } from "types";
import { BlackjackSeats } from "./index";

describe("BlackjackSeats", () => {
    it("should render only for online Blackjack games", () => {
        const handler = jest.fn();
        const onlineBlackjackGame: Game = {
            id: 4,
            name: "Pineapple on Pizza",
            type: GameType.Blackjack,
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
                image: "",
            },
            bgImage: "",
            seats: {
                1: false,
                2: false,
                3: true,
                4: false,
                5: true,
                6: false,
                7: false,
            },
        };
        const offlineBlackjackGame: Game = {
            id: 4,
            name: "Pineapple on Pizza",
            type: GameType.Blackjack,
            players: 2,
            betLimits: {
                currency: "€",
                min: 5,
                max: 100,
            },
            online: false,
            description: "",
            dealer: "Homer",
            language: {
                code: "uk",
                image: "",
            },
            bgImage: "",
            seats: {
                1: false,
                2: false,
                3: true,
                4: false,
                5: true,
                6: false,
                7: false,
            },
        };
        const rouletteGame: Game = {
            id: 4,
            name: "Pineapple on Pizza",
            type: GameType.Roulette,
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
                image: "",
            },
            bgImage: "",
            history: [3, 23, 22, 5, 6, 8, 0, 23, 22, 13],
        };

        const { rerender } = render(<BlackjackSeats handler={handler} game={onlineBlackjackGame} />);
        expect(screen.queryByTestId("game-blackjack-seats")).toBeInTheDocument();

        rerender(<BlackjackSeats handler={handler} game={offlineBlackjackGame} />);
        expect(screen.queryByTestId("game-blackjack-seats")).not.toBeInTheDocument();

        rerender(<BlackjackSeats handler={handler} game={rouletteGame} />);
        expect(screen.queryByTestId("game-blackjack-seats")).not.toBeInTheDocument();
    });

    it("should add .taken class to taken seats", () => {
        const handler = jest.fn();
        const game: Game = {
            id: 4,
            name: "Pineapple on Pizza",
            type: GameType.Blackjack,
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
                image: "",
            },
            bgImage: "",
            seats: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            },
        };

        const takenSeatKey = 3;
        const takenSeatTestId = "game-blackjack-seat-3";
        game.seats[takenSeatKey] = true;

        render(<BlackjackSeats handler={handler} game={game} />);

        expect(screen.queryByTestId(takenSeatTestId)?.classList).toContain("taken");
    });

    it("should call handler with correct arguments", () => {
        const handler = jest.fn();
        const gameId = 4;
        const game: Game = {
            id: gameId,
            name: "Pineapple on Pizza",
            type: GameType.Blackjack,
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
                image: "",
            },
            bgImage: "",
            seats: {
                1: true,
                2: false,
                3: false,
                4: true,
                5: false,
                6: false,
                7: false,
            },
        };

        render(<BlackjackSeats handler={handler} game={game} />);

        const openSeatKey = "3";
        const openSeatButton = screen.getByTestId(`game-blackjack-seat-${openSeatKey}`);
        act(() => { fireEvent.click(openSeatButton); });

        expect(handler).toBeCalledTimes(1);
        expect(handler).toBeCalledWith(gameId, openSeatKey);

        const takenSeatKey = "4";
        const takenSeatButton = screen.getByTestId(`game-blackjack-seat-${takenSeatKey}`);
        act(() => { fireEvent.click(takenSeatButton); });

        expect(handler).toBeCalledTimes(1);
    });
});
