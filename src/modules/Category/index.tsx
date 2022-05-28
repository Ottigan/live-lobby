import React, { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Game } from "modules/Game";
import { Category as C } from "components/Category";

interface CategoryProps {
    bgColor: string;
    gameIds: number[];
}

export const Category: React.FC<CategoryProps> = observer(({ bgColor, gameIds }) => {
    const store = useStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { gridSize } = store.uiStore;
    const games = store.gamesStore.getGames(gameIds);

    useEffect(() => {
        containerRef.current?.style.setProperty("--bg-color", bgColor);
        containerRef.current?.style.setProperty("--column-count", gridSize);
    }, [bgColor, gridSize]);

    return (
        <C containerRef={containerRef}>
            {games.map((game) => <Game key={game.name} game={game} />)}
        </C>
    );
});
