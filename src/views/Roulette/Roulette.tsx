import React from "react";
import { useStore } from "store/useStore";
import { Game } from "components/Game";

interface RouletteProps {
    className: string;
}

export const Roulette: React.FC<RouletteProps> = ({ className }) => {
    const store = useStore();

    return (
        <div className={`${className}`}>
            {store.games.map((game) => <Game key={game.name} game={game} />)}
        </div>
    );
};
