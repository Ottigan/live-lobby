import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { GridWidget as G } from "components/GridWidget";

interface GridWidgetProps {
    options: WidgetOption[] | undefined;
}

export const GridWidget: React.FC<GridWidgetProps> = observer(({ options }) => {
    const { uiStore } = useStore();

    const onClick = useCallback((e: React.MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value as GridSize;

        uiStore.setGridSize(value);
    }, [uiStore]);

    return (
        <>
            {options?.map((option) => {
                const { title, size, image } = option;
                const stringSize = String(size);
                const active = uiStore.gridSize === stringSize;

                return (
                    <G
                        key={title}
                        clickHandler={onClick}
                        title={title}
                        size={stringSize}
                        image={image}
                        active={active}
                    />
                );
            })}
        </>
    );
});
