import React from "react";
import { render, screen, within } from "@testing-library/react";
import { BaccaratResultColumn, Game, GameType, RouletteResultValue } from "types";
import { History } from "./index";

describe("History", () => {
    it("should not render for offline tables", () => {
        const game: Game = {
            id: 4,
            name: "Pineapple on Pizza",
            type: GameType.Roulette,
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
            history: [3, 23, 22, 5, 6, 8, 0, 23, 22, 13],
        };

        render(<History game={game} />);

        expect(screen.queryByTestId("game-history")).not.toBeInTheDocument();
    });

    it("should render baccarat history", () => {
        const resultBanker = "banker";
        const resultBankerTie = "bankerTie";
        const resultPlayer = "player";
        const resultPlayerTie = "playerTie";

        const history: BaccaratResultColumn[] = [
            [resultBanker, resultBanker, resultBanker, "", "", ""],
            [resultPlayer, resultPlayer, resultPlayerTie, "", "", ""],
            [resultBanker, resultBankerTie, resultBankerTie, "", "", ""],
            [resultPlayer, "", "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, "", ""],
            [resultPlayer, resultPlayer, "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, resultBanker, resultBanker],
            [resultPlayer, resultPlayer, "", "", "", resultBanker],
            [resultBanker, "", "", "", "", resultBanker],
            [resultPlayer, resultPlayerTie, resultPlayerTie, "", "", ""],
            [resultBanker, resultBanker, "", "", "", ""],
            [resultPlayerTie, resultPlayer, resultPlayer, "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, resultBanker, resultBanker],
            [resultPlayer, resultPlayer, "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, "", "", ""],
            [resultPlayer, "", "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, resultBanker, resultBanker],
            [resultPlayer, resultPlayerTie, resultPlayer, "", "", ""],
            [resultBanker, resultBanker, "", "", "", ""],
            [resultPlayer, resultPlayer, "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, resultBanker, ""],
            [resultPlayer, "", "", "", "", ""],
            [resultBanker, resultBanker, resultBanker, resultBanker, resultBanker, resultBanker],
            [resultPlayerTie, resultPlayer, "", "", "", ""],
            [resultBanker, resultBanker, "", "", "", ""],
            [resultPlayer, resultPlayer, resultPlayer, resultPlayer, resultPlayer, resultPlayerTie],
            ["", "", "", "", "", resultPlayer],
            ["", "", "", "", "", resultPlayer],
            ["", "", "", "", "", resultPlayer],
            ["", "", "", "", "", ""],
        ];
        const game: Game = {
            id: 4,
            name: "La Naturale",
            type: GameType.Baccarat,
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
            history,
        };

        render(<History game={game} />);

        const container = screen.getByTestId("game-history");
        const resultBankerElements = within(container).queryAllByTestId(resultBanker);
        const resultBankerTieElements = within(container).queryAllByTestId(resultBankerTie);
        const resultPlayerElements = within(container).queryAllByTestId(resultPlayer);
        const resultPlayerTieElements = within(container).queryAllByTestId(resultPlayerTie);

        expect(resultBankerElements.length).toEqual(49);
        expect(resultBankerTieElements.length).toEqual(2);
        expect(resultPlayerElements.length).toEqual(27);
        expect(resultPlayerTieElements.length).toEqual(7);
    });

    it("should render roulette history", () => {
        const history: RouletteResultValue[] = [3, 23, 22, 5, 6, 8, 0, 23, 22, 13];
        const game: Game = {
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
            history,
        };

        render(<History game={game} />);

        expect(screen.getByTestId("game-history").textContent).toMatch(history.join(""));
    });
});
