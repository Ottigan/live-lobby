import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface GridWidgetProps {
    title: string;
    size: string;
    image: string;
    active: boolean;
    clickHandler: (e: React.MouseEvent) => void;
}

export const GridWidget: React.FC<GridWidgetProps> = ({ title, size, image: Svg, active, clickHandler }) => {
    return (
        <button
            onClick={clickHandler}
            value={size}
            className={cn(styles.GridWidget, { active })}
            name={title}
            type="button"
            title={title}
        >
            <Svg />
        </button>
    );
};
