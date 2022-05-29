import React from "react";
import cn from "classnames";
import Avatar from "./components/Avatar";
import { BetLimits } from "./components/BetLimits";
import Footer from "./components/Footer";
import styles from "./styles.module.scss";

interface GameProps {
    gameImageDivRef: React.MutableRefObject<HTMLDivElement | null>;
    game: Game;
}

export const Game: React.FC<GameProps> = (props) => {
    const { gameImageDivRef, game } = props;
    const { betLimits, name, players, online, opensAt } = game;

    return (
        <div className={cn(styles.Game, { offline: !online })}>
            <Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />
            <BetLimits {...betLimits} />
            <Footer name={name} players={players} online={online} />
        </div>
    );
};
