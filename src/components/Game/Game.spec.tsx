import React from "react";
import { render, screen } from "@testing-library/react";
import { Game as TypeGame, GameType } from "types";
import { Game } from "./Game";

describe("Game", () => {
    it("should render roulette game", () => {
        const handler = jest.fn();
        const ref = { current: null };
        const game: TypeGame = {
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

        render(<Game blackjackSeatHandler={handler} gameImageDivRef={ref} game={game} />);

        expect(screen.queryByTestId("game")).toBeInTheDocument();
        expect(screen.queryByTestId("game-avatar")).toBeInTheDocument();
        expect(screen.queryByTestId("game-bet-limits")).toBeInTheDocument();
        expect(screen.queryByTestId("game-dealer")).toBeInTheDocument();
        expect(screen.queryByTestId("game-footer")).toBeInTheDocument();
        expect(screen.queryByTestId("game-history")).toBeInTheDocument();
    });

    it("should render blackjack game", () => {
        const handler = jest.fn();
        const ref = { current: null };
        const game: TypeGame = {
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

        render(<Game blackjackSeatHandler={handler} gameImageDivRef={ref} game={game} />);

        expect(screen.queryByTestId("game")).toBeInTheDocument();
        expect(screen.queryByTestId("game-avatar")).toBeInTheDocument();
        expect(screen.queryByTestId("game-bet-limits")).toBeInTheDocument();
        expect(screen.queryByTestId("game-blackjack-seats")).toBeInTheDocument();
        expect(screen.queryByTestId("game-dealer")).toBeInTheDocument();
        expect(screen.queryByTestId("game-footer")).toBeInTheDocument();
    });
});
