import React from "react";
import { Game, GameType } from "types";
import { BaccaratHistory } from "./types/BaccaratHistory";
import { RouletteHistory } from "./types/RouletteHistory";

interface HistoryProps {
    game: Game;
}

export const History: React.FC<HistoryProps> = ({ game }) => {
    const { online, type } = game;

    if (online) {
        switch (type) {
            case GameType.Baccarat:
                return <BaccaratHistory game={game} />;
            case GameType.Roulette: {
                return <RouletteHistory game={game} />;
            }
        }
    }

    return null;
};
