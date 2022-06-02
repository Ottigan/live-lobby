import React, { useCallback } from "react";
import { SearchWidget as SearchWidgetComponent } from "components/Widgets/subComponents/SearchWidget";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";

export const SearchWidget = observer(() => {
    const { gamesStore } = useStore();

    const onChange = useCallback((e: React.ChangeEvent) => {
        gamesStore.handleSearch((e.target as HTMLInputElement).value);
    }, [gamesStore]);

    return <SearchWidgetComponent handler={onChange} value={gamesStore.search} />;
});
