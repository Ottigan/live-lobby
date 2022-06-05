import React from "react";
import cn from "classnames";
import { Game, GameType, RouletteResultValue } from "types";
import styles from "./styles.module.scss";

enum Colors {
    Green = "green",
    Black = "black",
    Red = "red",

}

const RouletteResultColor: Record<RouletteResultValue, Colors> = {
    0: Colors.Green,
    1: Colors.Black,
    2: Colors.Red,
    3: Colors.Black,
    4: Colors.Red,
    5: Colors.Black,
    6: Colors.Red,
    7: Colors.Black,
    8: Colors.Red,
    9: Colors.Black,
    10: Colors.Red,
    11: Colors.Black,
    12: Colors.Red,
    13: Colors.Black,
    14: Colors.Red,
    15: Colors.Black,
    16: Colors.Red,
    17: Colors.Black,
    18: Colors.Red,
    19: Colors.Black,
    20: Colors.Red,
    21: Colors.Black,
    22: Colors.Red,
    23: Colors.Black,
    24: Colors.Red,
    25: Colors.Black,
    26: Colors.Red,
    27: Colors.Black,
    28: Colors.Red,
    29: Colors.Black,
    30: Colors.Red,
    31: Colors.Black,
    32: Colors.Red,
    33: Colors.Black,
    34: Colors.Red,
    35: Colors.Black,
    36: Colors.Red,
};

interface HistoryProps {
    game: Game;
}

export const History: React.FC<HistoryProps> = ({ game }) => {
    const { online, type } = game;

    if (online && type === GameType.Roulette) {
        return (
            <div className={styles.history} data-testid="game-history">
                {game.history.map((result, i) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <span key={i} className={cn(styles.rolResult, RouletteResultColor[result])}>{result}</span>;
                })}
            </div>
        );
    }

    return null;
};
