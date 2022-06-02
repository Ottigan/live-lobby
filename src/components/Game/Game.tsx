import React from "react";
import cn from "classnames";
import { BlackjackSeatIndex, Game as TypeGame } from "types";
import { Avatar } from "./subComponents/Avatar";
import { BetLimits } from "./subComponents/BetLimits";
import { History } from "./subComponents/History";
import { Footer } from "./subComponents/Footer";
import { Dealer } from "./subComponents/Dealer";
import { BlackjackSeats } from "./subComponents/BlackjackSeats";
import styles from "./styles.module.scss";

interface GameProps {
    gameImageDivRef: React.MutableRefObject<HTMLDivElement | null>;
    blackjackSeatHandler: (id: number, index: BlackjackSeatIndex) => Promise<void>;
    game: TypeGame;
}

export const Game: React.FC<GameProps> = (props) => {
    const { gameImageDivRef, blackjackSeatHandler, game } = props;
    const { betLimits, online, dealer, opensAt } = game;

    return (
        <div className={cn(styles.game, { [styles.offline]: !online })}>
            <Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />
            <BetLimits {...betLimits} />
            <Dealer dealer={dealer} />
            <BlackjackSeats game={game} blackjackSeatHandler={blackjackSeatHandler} />
            <History game={game} />
            <Footer game={game} />
        </div>
    );
};
