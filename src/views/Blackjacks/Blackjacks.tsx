import React from "react";
import { useStore } from "hooks/useStore";
import { ObGame } from "modules/ObGame";
import blackjackBg from "assets/blackjack-bg.jpg";
import styles from "./styles.module.scss";

interface BlackjacksProps {
    className: string;
}

export const Blackjacks: React.FC<BlackjacksProps> = ({ className }) => {
    const store = useStore();

    return (
        <div className={`${styles.Blackjacks} ${className}`}>
            {store.lobbyStore.blackjacks.map((game) => <ObGame key={game.name} game={game} image={(blackjackBg as string)} />)}
        </div>
    );
};
