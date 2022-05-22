import { useStore } from "hooks/useStore";
import React, { useCallback } from "react";
import { GridSize } from "../../types";
import LargeGrid from "./components/LargeGrid";
import MediumGrid from "./components/MediumGrid";
import SmallGrid from "./components/SmallGrid";
import styles from "./styles.module.scss";

interface GridWidgetProps {
    className?: string;
}

const defaultProps = {
    className: "",
};

export const GridWidget: React.FC<GridWidgetProps> = ({ className }) => {
    const { uiStore } = useStore();

    const onClick = useCallback((e: React.MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value as GridSize;

        uiStore.setViewColumns(value);
    }, [uiStore]);

    return (
        <div className={`${styles.GridWidget} ${className}`}>
            <button
                onClick={onClick}
                className={`${uiStore.gridSize === GridSize.Large ? "active" : ""}`}
                value={GridSize.Large}
                type="button"
                title="Large grid"
            ><LargeGrid />
            </button>
            <button
                onClick={onClick}
                className={`${uiStore.gridSize === GridSize.Medium ? "active" : ""}`}
                value={GridSize.Medium}
                type="button"
                title="Medium grid"
            ><MediumGrid />
            </button>
            <button
                onClick={onClick}
                className={`${uiStore.gridSize === GridSize.Small ? "active" : ""}`}
                value={GridSize.Small}
                type="button"
                title="Small grid"
            ><SmallGrid />
            </button>
        </div>
    );
};

GridWidget.defaultProps = defaultProps;
