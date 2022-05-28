import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Game as G } from "components/Game";

interface GameProps {
    game: Game;
}

export const Game: React.FC<GameProps> = observer((props) => {
    const { game } = props;
    const { bgImage } = game;
    const gameImageDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (gameImageDivRef.current) {
            gameImageDivRef.current.style.backgroundImage = `url(${bgImage})`;
        }
    }, [bgImage]);

    return (
        <G gameImageDivRef={gameImageDivRef} game={game} />
    );
});
