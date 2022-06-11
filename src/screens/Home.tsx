import React from "react";
import { Loader } from "components/Loader";
import { useStore } from "hooks/useStore";
import { observer } from "mobx-react-lite";
import { Categories } from "modules/Categories";
import { Navbar } from "modules/Navbar";
import { Widgets } from "modules/Widgets";

export const Home = observer(() => {
    const categoriesStore = useStore("CategoriesStore");
    const gamesStore = useStore("GamesStore");
    const widgetsStore = useStore("WidgetsStore");

    const isLoading = categoriesStore.isLoading || gamesStore.isLoading || widgetsStore.isLoading;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <Widgets />
            <Categories />
        </>
    );
});
