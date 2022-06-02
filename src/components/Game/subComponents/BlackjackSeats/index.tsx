import React, { useCallback } from "react";
import cn from "classnames";
import { BlackjackSeatIndex, Game, GameType } from "types";
import styles from "./styles.module.scss";

interface BlackjackSeatsProps {
    game: Game;
    blackjackSeatHandler: (id: number, index: BlackjackSeatIndex) => Promise<void>;
}

export const BlackjackSeats: React.FC<BlackjackSeatsProps> = ({ game, blackjackSeatHandler }) => {
    const { id, online, type } = game;

    const handleClick = useCallback((e: React.MouseEvent) => {
        const { value } = e.target as HTMLButtonElement;

        blackjackSeatHandler(id, (value as BlackjackSeatIndex))
            // eslint-disable-next-line no-console
            .catch((err) => console.error(err));
    }, [blackjackSeatHandler, id]);

    if (online && type === GameType.Blackjack) {
        return (
            <div className={styles.blackjackSeats}>
                {Object.keys(game.seats).map((key) => {
                    const k = key as BlackjackSeatIndex;

                    return (
                        <button
                            key={k}
                            type="button"
                            onClick={handleClick}
                            value={k}
                            className={cn(styles.seat, { taken: game.seats[k] })}
                        >
                            &#8203;
                        </button>
                    );
                })}
            </div>
        );
    }

    return null;
};
