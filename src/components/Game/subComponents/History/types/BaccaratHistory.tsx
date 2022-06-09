/* eslint-disable react/no-array-index-key */
import React from "react";
import { BaccaratGame } from "types";
import cn from "classnames";
import styles from "../styles.module.scss";

interface BaccaratHistoryProps {
    game: BaccaratGame;
}

export const BaccaratHistory: React.FC<BaccaratHistoryProps> = (props) => {
    const { game } = props;

    return (
        <div className={styles.baccaratHistory} data-testid="game-history">
            {game.history.map((column, i) => {
                return (
                    <div key={i} className={cn(styles.bacColumn)}>
                        {column.map((result, y) => {
                            return (
                                <span key={y} className={cn(styles.bacResult, result)} data-testid={result} />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
