import React from "react";
import { Game } from "types";
import styles from "./styles.module.scss";

type FooterProps = Pick<Game, "name" | "players" | "language" | "online">;

export const Footer: React.FC<FooterProps> = (props) => {
    const { name, players, language, online } = props;
    const { code, image } = language;

    return (
        <footer className={styles.footer} data-testid="game-footer">
            <span className={styles.leftContainer}>
                <img src={image} alt={`${code} flag`} className={styles.flag} />
                <p data-testid="game-footer-name">{name}</p>
            </span>
            {online ? <span data-testid="game-footer-players">{players}</span> : null}
        </footer>
    );
};
