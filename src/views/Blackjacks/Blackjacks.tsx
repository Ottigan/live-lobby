import React, { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";
import { ObGame } from "modules/ObGame";
import blackjackBg from "assets/blackjack-bg.jpg";
import styles from "./styles.module.scss";

interface BlackjacksProps {
    className: string;
}

export const Blackjacks: React.FC<BlackjacksProps> = ({ className }) => {
    const store = useStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { gridSizeValue } = store.uiStore;

    useEffect(() => containerRef.current?.style.setProperty("--column-count", gridSizeValue), [gridSizeValue]);

    return (
        <div ref={containerRef} className={`${styles.Blackjacks} ${className}`}>
            {store.lobbyStore.blackjacks.map((game) => <ObGame key={game.name} game={game} image={(blackjackBg as string)} />)}
        </div>
    );
};
