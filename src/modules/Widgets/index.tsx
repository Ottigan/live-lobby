import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks/useStore";
import { Widgets as WidgetsComponent } from "components/Widgets";
import { GridWidget } from "./GridWidget";
import { FilterWidget } from "./FilterWidget";
import { SearchWidget } from "./SearchWidget";

export const Widgets = observer(() => {
    const uiStore = useStore("UiStore");
    const widgetsStore = useStore("WidgetsStore");

    return (
        <WidgetsComponent>
            {widgetsStore.widgets.map((widget) => {
                const { name } = widget;

                switch (name) {
                    case "searchWidget":
                        return <SearchWidget key={name} />;
                    case "filterWidget":
                        return <FilterWidget key={name} options={widget.options} />;
                    case "gridWidget":
                        return uiStore.windowDimensions.width > 420
                            ? <GridWidget key={name} options={widget.options} />
                            : null;
                    default:
                        return null;
                }
            })}
        </WidgetsComponent>
    );
});
