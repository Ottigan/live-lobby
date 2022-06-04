import React from "react";
import styles from "./styles.module.scss";

export const Loader: React.FC = () => {
    return (
        <div className={styles.loader} data-testid="loader">
            <div className={styles.spinner} />
        </div>
    );
};
