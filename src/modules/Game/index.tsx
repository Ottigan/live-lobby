import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Game as G } from "components/Game";
import { useStore } from "hooks/useStore";

interface GameProps {
    game: Game;
}

export const Game: React.FC<GameProps> = observer((props) => {
    const gameImageDivRef = useRef<HTMLDivElement | null>(null);
    const { uiStore: { gridSize } } = useStore();
    const { game } = props;

    useEffect(() => {
        if (gameImageDivRef.current) {
            const style = getComputedStyle((gameImageDivRef.current));
            const fontSize = style.getPropertyValue(`--${gridSize}-font-size`);

            gameImageDivRef.current.parentElement?.style.setProperty("--game-font-size", fontSize);
            gameImageDivRef.current.style.backgroundImage = `url(${props.game.bgImage})`;
        }
    }, [gridSize, props.game.bgImage]);

    return (
        <G gameImageDivRef={gameImageDivRef} game={game} />
    );
});
