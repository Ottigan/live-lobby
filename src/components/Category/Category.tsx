import React from "react";
import styles from "./styles.module.scss";

interface CategoryProps {
    containerRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}

export const Category: React.FC<CategoryProps> = (props) => {
    const { containerRef, children } = props;

    return (
        <div ref={containerRef} className={styles.category}>
            {children}
        </div>
    );
};
