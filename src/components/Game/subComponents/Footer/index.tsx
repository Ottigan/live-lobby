import React from "react";
import { Game } from "types";
import styles from "./styles.module.scss";

interface FooterProps {
    game: Game;
}

export const Footer: React.FC<FooterProps> = ({ game }) => {
    const { name, players, language, online } = game;

    return (
        <footer className={styles.Footer}>
            <span className={styles.LeftContainer}>
                <img src={language} alt="flag icon" className={styles.Flag} />
                <p>{name}</p>
            </span>
            {online ? <span>{players}</span> : null}
        </footer>
    );
};
