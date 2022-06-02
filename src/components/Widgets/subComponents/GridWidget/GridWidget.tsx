import React from "react";
import cn from "classnames";
import { GridWidgetOption } from "types";
import styles from "./styles.module.scss";

interface GridWidgetProps {
    handler: (e: React.MouseEvent) => void;
    activeGrid: string | undefined;
    options: GridWidgetOption[];
}

export const GridWidget: React.FC<GridWidgetProps> = (props) => {
    const { handler, activeGrid, options } = props;

    return (
        <span className={styles.gridWidget}>
            {options.map((option) => {
                const { title, size, image: Svg } = option;
                const stringSize = String(size);
                const active = activeGrid === stringSize;

                return (
                    <button
                        key={title}
                        onClick={handler}
                        value={size}
                        className={cn(styles.option, { [styles.active]: active })}
                        name={title}
                        type="button"
                        title={title}
                    >
                        <Svg />
                    </button>
                );
            })}
        </span>
    );
};
