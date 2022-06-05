import React from "react";
import { render, screen } from "@testing-library/react";
import { Game, GameType, RouletteResultValue } from "types";
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
