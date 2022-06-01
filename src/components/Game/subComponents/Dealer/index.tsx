import React from "react";
import styles from "./styles.module.scss";

interface DealerProps {
    dealer: string | null;
}

export const Dealer: React.FC<DealerProps> = (props) => {
    const { dealer } = props;

    return <p className={styles.Dealer}>{dealer}</p>;
};
