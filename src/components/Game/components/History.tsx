import React from "react";
import { RouletteResultColor } from "declarations/types";
import cn from "classnames";
import styles from "../styles.module.scss";

interface HistoryProps {
    game: Game;
}

export const History: React.FC<HistoryProps> = ({ game }) => {
    const { online, type } = game;

    if (online && type === GameType.Roulette) {
        return (
            <div className={styles.History}>
                {game.history.map((result, i) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <span key={i} className={cn("rol-result", RouletteResultColor[result])}>{result}</span>;
                })}
            </div>
        );
    }

    return null;
};
