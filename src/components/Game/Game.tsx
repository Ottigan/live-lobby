import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

interface GameProps {
    game: Game;
}

export const Game: React.FC<GameProps> = observer((props) => {
    const { game } = props;

    return (
        <div className={`${styles.Game}`}>
            <span className={`${styles.BetLimits}`}>{`${game.betLimits.currency} ${game.betLimits.min}`}</span>
            <footer className={`${styles.Footer}`}>
                <span>{game.name}</span>
                <span>{game.players}</span>
            </footer>
        </div>
    );
});
