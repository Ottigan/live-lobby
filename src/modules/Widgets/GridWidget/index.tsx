import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { GridWidget as GridWidgetComponent } from "components/Widgets/subComponents/GridWidget";
import { GridSize, GridWidgetOption } from "types";

interface GridWidgetProps {
    options: GridWidgetOption[];
}

export const GridWidget: React.FC<GridWidgetProps> = observer(({ options }) => {
    const uiStore = useStore("UiStore");

    const onClick = useCallback((e: React.MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value as GridSize;

        uiStore.setGridSize(value);
    }, [uiStore]);

    return (
        <GridWidgetComponent
            handler={onClick}
            activeGrid={uiStore.gridSize}
            options={options}
        />
    );
});
