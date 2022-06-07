import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Game as GameComponent } from "components/Game";
import { useStore } from "hooks/useStore";
import { BlackjackSeatIndex, Game as TypeGame } from "types";

interface GameProps {
    game: TypeGame;
}

export const Game: React.FC<GameProps> = observer((props) => {
    const gameImageDivRef = useRef<HTMLDivElement>(null);
    const { gamesService, uiStore: { gridSize } } = useStore();
    const { game } = props;

    useEffect(() => {
        if (gameImageDivRef.current) {
            const style = getComputedStyle((gameImageDivRef.current));
            const fontSize = style.getPropertyValue(`--${gridSize}-font-size`);

            gameImageDivRef.current.parentElement?.style.setProperty("--game-font-size", fontSize);
            gameImageDivRef.current.style.backgroundImage = `url(${props.game.bgImage})`;
        }
    }, [gridSize, props.game.bgImage]);

    const blackjackSeatHandler = useCallback((id: number, index: BlackjackSeatIndex) => {
        gamesService.takeBlackjackSeat(id, index).catch((err) => console.error(err));
    }, [gamesService]);

    return (
        <GameComponent gameImageDivRef={gameImageDivRef} game={game} blackjackSeatHandler={blackjackSeatHandler} />
    );
});
