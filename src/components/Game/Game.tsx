import React from "react";
import cn from "classnames";
import { Game as TypeGame } from "types";
import { Avatar } from "./subComponents/Avatar";
import { BetLimits } from "./subComponents/BetLimits";
import { History } from "./subComponents/History";
import { Footer } from "./subComponents/Footer";
import styles from "./styles.module.scss";

interface GameProps {
    gameImageDivRef: React.MutableRefObject<HTMLDivElement | null>;
    game: TypeGame;
}

export const Game: React.FC<GameProps> = (props) => {
    const { gameImageDivRef, game } = props;
    const { betLimits, name, players, online, opensAt } = game;

    return (
        <div className={cn(styles.Game, { offline: !online })}>
            <Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />
            <BetLimits {...betLimits} />
            <History game={game} />
            <Footer name={name} players={players} online={online} />
        </div>
    );
};
