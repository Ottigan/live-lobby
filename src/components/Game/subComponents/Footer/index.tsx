import React from "react";
import { Game } from "types";
import styles from "./styles.module.scss";

interface FooterProps {
    game: Game;
}

export const Footer: React.FC<FooterProps> = ({ game }) => {
    const { name, players, language, online } = game;

    return (
        <footer className={styles.footer}>
            <span className={styles.leftContainer}>
                <img src={language.image} alt="flag icon" className={styles.flag} />
                <p>{name}</p>
            </span>
            {online ? <span>{players}</span> : null}
        </footer>
    );
};
