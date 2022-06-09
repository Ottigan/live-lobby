/* eslint-disable react/no-array-index-key */
import React from "react";
import { RouletteGame, RouletteResultValue } from "types";
import cn from "classnames";
import styles from "../styles.module.scss";

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

interface RouletteHistoryProps {
    game: RouletteGame;
}

export const RouletteHistory: React.FC<RouletteHistoryProps> = (props) => {
    const { game } = props;

    return (
        <div className={styles.rouletteHistory} data-testid="game-history">
            {game.history.map((result, i) => {
                return <span key={i} className={cn(styles.rolResult, RouletteResultColor[result])}>{result}</span>;
            })}
        </div>
    );
};
