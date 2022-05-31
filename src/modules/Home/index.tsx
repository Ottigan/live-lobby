import React from "react";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Home as HomeScreen } from "screens/Home";

export const Home: React.FC = observer(() => {
    const { categoriesStore, gamesStore, widgetsStore } = useStore();

    const isLoading = categoriesStore.isLoading || widgetsStore.isLoading || gamesStore.isLoading;

    return <HomeScreen isLoading={isLoading} />;
});
