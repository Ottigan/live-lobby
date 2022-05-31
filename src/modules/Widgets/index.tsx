import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { GridWidget } from "modules/Widgets/GridWidget";
import { Widgets as WidgetsComponent } from "components/Widgets";

export const Widgets = observer(() => {
    const { uiStore, widgetsStore } = useStore();

    return (
        <WidgetsComponent>
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
        </WidgetsComponent>
    );
});
