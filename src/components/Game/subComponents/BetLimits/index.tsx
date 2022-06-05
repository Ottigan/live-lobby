import React from "react";
import styles from "./styles.module.scss";

interface BetLimitsProps {
    currency: string;
    min: number;
    max: number;
}

export const BetLimits: React.FC<BetLimitsProps> = (props) => {
    const { currency, min, max } = props;

    return (
        <div className={styles.betLimits} data-testid="game-bet-limits">
            <span>{`${currency} ${min} `}</span>
            <span className="max-limits">{`- ${max}`}</span>
        </div>
    );
};
