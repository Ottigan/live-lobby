import React from "react";
import styles from "./styles.module.scss";

interface FooterProps {
    name: string;
    players: number;
    online: boolean;
}

export const Footer: React.FC<FooterProps> = (props) => {
    const { name, players, online } = props;

    return (
        <footer className={styles.Footer}>
            <span>{name}</span>
            {online ? <span>{players}</span> : null}
        </footer>
    );
};
