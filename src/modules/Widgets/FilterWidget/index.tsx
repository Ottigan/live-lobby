import React, { useCallback } from "react";
import { Filter, FilterWidgetOption } from "types";
import { FilterWidget as FilterWidgetComponent } from "components/Widgets/subComponents/FilterWidget";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";

interface FilterWidgetProps {
    options: FilterWidgetOption[];
}

export const FilterWidget: React.FC<FilterWidgetProps> = observer(({ options }) => {
    const gamesStore = useStore("GamesStore");

    const onClick = useCallback((filter: Filter) => {
        gamesStore.filter = filter;
    }, [gamesStore]);

    return (
        <FilterWidgetComponent
            handler={onClick}
            activeFilter={gamesStore.filter?.title}
            options={options}
        />
    );
});
