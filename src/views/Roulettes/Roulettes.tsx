import React from "react";
import { useStore } from "hooks/useStore";
import { ObGame } from "modules/ObGame";
import rouletteBg from "assets/roulette-bg.jpg";
import styles from "./styles.module.scss";

interface RoulettesProps {
    className: string;
}

export const Roulettes: React.FC<RoulettesProps> = ({ className }) => {
    const store = useStore();

    return (
        <div className={`${styles.Roulettes} ${className}`}>
            {store.lobbyStore.roulettes.map((game) => <ObGame key={game.name} game={game} image={(rouletteBg as string)} />)}
        </div>
    );
};
