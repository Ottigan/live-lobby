import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface WidgetsProps {
    children: React.ReactNode;
    className: string;

}

export const Widgets: React.FC<WidgetsProps> = (props) => {
    const { children, className } = props;

    return (
        <div className={cn(styles.Widgets, className)}>
            {children}
        </div>
    );
};
