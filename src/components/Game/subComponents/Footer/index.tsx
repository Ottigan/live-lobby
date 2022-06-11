import React from "react";
import { Game } from "types";
import franceFlag from "assets/france.png";
import germanyFlag from "assets/germany.png";
import indiaFlag from "assets/india.png";
import ukFlag from "assets/uk.png";
import styles from "./styles.module.scss";

const flagImages: Record<string, string> = {
    fr: franceFlag,
    de: germanyFlag,
    in: indiaFlag,
    uk: ukFlag,
};

type FooterProps = Pick<Game, "name" | "players" | "language" | "online">;

export const Footer: React.FC<FooterProps> = (props) => {
    const { name, players, language, online } = props;

    return (
        <footer className={styles.footer} data-testid="game-footer">
            <span className={styles.leftContainer}>
                <img src={flagImages[language]} alt={`${language} flag`} className={styles.flag} />
                <p data-testid="game-footer-name">{name}</p>
            </span>
            {online ? <span data-testid="game-footer-players">{players}</span> : null}
        </footer>
    );
};
