import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface GameProps {
    game: Game;
    image: string;
}

export const Game: React.FC<GameProps> = (props) => {
    const { game, image } = props;
    const myGame = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (myGame.current) {
            myGame.current.style.backgroundImage = `url(${image})`;
        }
    }, [image]);

    return (
        <div ref={myGame} className={`${styles.Game}`}>
            <span className={`${styles.BetLimits}`}>{`${game.betLimits.currency} ${game.betLimits.min}`}</span>
            <footer className={`${styles.Footer}`}>
                <span>{game.name}</span>
                <span>{game.players}</span>
            </footer>
        </div>
    );
};
