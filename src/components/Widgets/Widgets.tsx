import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface WidgetsProps {
    children: React.ReactNode;
}

export const Widgets: React.FC<WidgetsProps> = (props) => {
    const { children } = props;

    return (
        <div className={cn(styles.Widgets)}>
            {children}
        </div>
    );
};
