import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { GridWidget } from "modules/GridWidget";
import { Widgets as W } from "components/Widgets";

interface WidgetsProps {
    className: string;
}

export const Widgets: React.FC<WidgetsProps> = observer(({ className }) => {
    const { uiStore, widgetsStore } = useStore();

    return (
        <W className={className}>
            {widgetsStore.getWidgets().map((widget) => {
                const { name, options } = widget;

                switch (name) {
                    case "gridWidget":
                        return uiStore.windowDimensions.width > 420
                            ? <GridWidget key={name} options={options} />
                            : null;
                    default:
                        return null;
                }
            })}
        </W>
    );
});
