import React, { useCallback } from "react";
import cn from "classnames";
import { BlackjackSeatIndex, Game, GameType } from "types";
import styles from "./styles.module.scss";

interface BlackjackSeatsProps {
    handler: (id: number, index: BlackjackSeatIndex) => void;
    game: Game;
}

export const BlackjackSeats: React.FC<BlackjackSeatsProps> = ({ game, handler }) => {
    const { id, online, type } = game;

    const handleClick = useCallback((e: React.MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value as BlackjackSeatIndex;

        handler(id, value);
    }, [handler, id]);

    if (online && type === GameType.Blackjack) {
        return (
            <div className={styles.blackjackSeats} data-testid="game-blackjack-seats">
                {Object.keys(game.seats).map((key) => {
                    const k = key as BlackjackSeatIndex;

                    const taken = game.seats[k];

                    return (
                        <button
                            key={k}
                            type="button"
                            onClick={handleClick}
                            value={k}
                            className={cn(styles.seat, { taken })}
                            disabled={taken}
                            data-testid={`game-blackjack-seat-${key}`}
                        />
                    );
                })}
            </div>
        );
    }

    return null;
};
