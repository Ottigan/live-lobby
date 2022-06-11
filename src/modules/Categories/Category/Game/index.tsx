import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Game as GameComponent } from "components/Game";
import { useStore } from "hooks/useStore";
import { BlackjackSeatIndex, Game as TypeGame } from "types";
import { useService } from "hooks/useService";

interface GameProps {
    game: TypeGame;
}

export const Game: React.FC<GameProps> = observer(({ game }) => {
    const gameImageDivRef = useRef<HTMLDivElement>(null);
    const { gridSize } = useStore("UiStore");
    const gamesService = useService("GamesService");

    useEffect(() => {
        if (gameImageDivRef.current) {
            const style = getComputedStyle((gameImageDivRef.current));
            const fontSize = style.getPropertyValue(`--${gridSize}-font-size`);

            gameImageDivRef.current.parentElement?.style.setProperty("--game-font-size", fontSize);
            gameImageDivRef.current.style.backgroundImage = `url(${game.bgImage})`;
        }
    }, [game.bgImage, gridSize]);

    const blackjackSeatHandler = useCallback((id: number, index: BlackjackSeatIndex) => {
        gamesService.takeBlackjackSeat(id, index);
    }, [gamesService]);

    return (
        <GameComponent gameImageDivRef={gameImageDivRef} game={game} players={game.players} blackjackSeatHandler={blackjackSeatHandler} />
    );
});
