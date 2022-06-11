import React from "react";
import cn from "classnames";
import { GridSize, GridWidgetOption } from "types";
import smallGrid from "assets/small-grid.svg";
import mediumGrid from "assets/medium-grid.svg";
import largeGrid from "assets/large-grid.svg";
import styles from "./styles.module.scss";

const gridImages: Record<GridSize, string> = {
    sm: smallGrid,
    md: mediumGrid,
    lg: largeGrid,
};

interface GridWidgetProps {
    handler: (e: React.MouseEvent) => void;
    activeGrid: string | undefined;
    options: GridWidgetOption[];
}

export const GridWidget: React.FC<GridWidgetProps> = (props) => {
    const { handler, activeGrid, options } = props;

    return (
        <span className={styles.gridWidget} data-testid="grid-widget">
            {options.map((option) => {
                const { title, size } = option;
                const stringSize = String(size);
                const active = activeGrid === stringSize;

                const Svg = gridImages[size];

                return (
                    <button
                        key={title}
                        onClick={handler}
                        value={size}
                        className={cn(styles.option, { [styles.active]: active })}
                        name={title}
                        type="button"
                        title={title}
                        data-testid={title}
                    >
                        <Svg />
                    </button>
                );
            })}
        </span>
    );
};
