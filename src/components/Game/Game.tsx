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
    blackjackSeatHandler: (id: number, index: BlackjackSeatIndex) => void;
    gameImageDivRef: React.RefObject<HTMLDivElement>;
    game: TypeGame;
    players: number;
}

export const Game: React.FC<GameProps> = (props) => {
    const { blackjackSeatHandler, gameImageDivRef, game, players } = props;
    const { name, betLimits, online, dealer, language, opensAt } = game;

    return (
        <div className={cn(styles.game, { [styles.offline]: !online })} data-testid="game">
            <Avatar gameImageDivRef={gameImageDivRef} online={online} opensAt={opensAt} />
            <BetLimits {...betLimits} />
            <Dealer dealer={dealer} />
            <BlackjackSeats game={game} handler={blackjackSeatHandler} />
            <History game={game} />
            <Footer name={name} players={players} language={language} online={online} />
        </div>
    );
};
