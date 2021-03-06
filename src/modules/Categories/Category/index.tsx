import React, { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Game } from "modules/Categories/Category/Game";
import { Category as CategoryComponent } from "components/Category";
import noResultsImage from "assets/no-results.png";

interface CategoryProps {
    bgColor: string;
    gameIds: number[];
}

export const Category: React.FC<CategoryProps> = observer(({ bgColor, gameIds }) => {
    const gamesStore = useStore("GamesStore");
    const uiStore = useStore("UiStore");
    const containerRef = useRef<HTMLDivElement>(null);
    const games = gamesStore.getGames(gameIds);
    const { gridSize } = uiStore;

    useEffect(() => {
        if (containerRef.current) {
            const style = getComputedStyle((containerRef.current));
            const desktopValue = style.getPropertyValue(`--${gridSize}-desktop-columns`);
            const laptopValue = style.getPropertyValue(`--${gridSize}-laptop-columns`);
            const tabletValue = style.getPropertyValue(`--${gridSize}-tablet-columns`);

            containerRef.current?.style.setProperty("--bg-color", bgColor);
            containerRef.current?.style.setProperty("--desktop-columns", desktopValue);
            containerRef.current?.style.setProperty("--laptop-columns", laptopValue);
            containerRef.current?.style.setProperty("--tablet-columns", tabletValue);
        }
    }, [bgColor, gridSize]);

    return (
        <CategoryComponent containerRef={containerRef}>
            {games.length
                ? games.map((game) => <Game key={game.name} game={game} />)
                : <img src={noResultsImage} alt="Image depicting that nothing was found" />}
        </CategoryComponent>
    );
});
