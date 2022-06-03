import React, { useCallback, useEffect } from "react";
import { SearchWidget as SearchWidgetComponent } from "components/Widgets/subComponents/SearchWidget";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { useDebounce } from "hooks/useDebounce";

export const SearchWidget = observer(() => {
    const { gamesStore } = useStore();
    const location = useLocation();
    const [currSearch, setSearch, debouncedSearch] = useDebounce(gamesStore.search);

    useEffect(() => {
        gamesStore.handleSearch("");
    }, [gamesStore, location.pathname]);

    useEffect(() => {
        gamesStore.handleSearch(debouncedSearch);
    }, [gamesStore, debouncedSearch]);

    const onChange = useCallback((e: React.ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value);
    }, [setSearch]);

    return <SearchWidgetComponent handler={onChange} value={currSearch} />;
});
