import React from "react";
import styles from "./styles.module.scss";

interface SearchWidgetProps {
    handler: (e: React.ChangeEvent) => void;
    value: string;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ handler, value }) => {
    return (
        <input
            onChange={handler}
            value={value}
            type="text"
            placeholder="Search..."
            className={styles.searchWidget}
        />
    );
};
